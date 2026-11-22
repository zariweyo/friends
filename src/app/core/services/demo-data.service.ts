import { Injectable, signal } from '@angular/core';
import collections from '../../../assets/mock/collections.json';
export type Person = (typeof collections.profiles)[number];
export type Request = (typeof collections.messageRequests)[number];
export type Chat = (typeof collections.conversations)[number];
export type Message = (typeof collections.messages)[number];
export type Rating = (typeof collections.ratings)[number];
export type UserRole = 'admin'|'moderator'|'user';
export type ReportReason = 'harassment'|'inappropriate'|'spam'|'fake_profile'|'other';
export type ReportStatus = 'pending'|'reviewing'|'resolved'|'dismissed';
export interface Report {id:string;reporterId:string;targetId:string;messageId:string|null;reason:ReportReason;details:string;status:ReportStatus;reviewedBy:string|null;resolution:string|null;}
export type NotificationKind = 'request'|'accepted'|'rejected'|'message'|'closed'|'report'|'system';
export interface DemoNotification {id:string;kind:NotificationKind;text:string;createdAt:string;read:boolean;relatedId:string|null;}
export interface ConversationState {conversationId:string;status:'active'|'closed';closedBy:string|null;closedAt:string|null;}
export interface RequestRejection {requestId:string;message:string;}
export type RejectionReason = 'not_my_type' | 'message_rejected';

@Injectable({ providedIn: 'root' })
export class DemoDataService {
 readonly people = signal<Person[]>(structuredClone(collections.profiles));
 readonly requests = signal<Request[]>(structuredClone(collections.messageRequests));
 readonly chats = signal<Chat[]>(structuredClone(collections.conversations));
 readonly messages = signal<Message[]>(structuredClone(collections.messages));
 readonly cities = collections.cities;
 readonly roles = signal<{userId:string;role:UserRole}[]>(collections.roles.map(r=>({userId:r.userId,role:r.role as UserRole})));
 readonly reports = signal<Report[]>(collections.reports.map(r=>({...r,reason:r.reason as ReportReason,status:r.status as ReportStatus})));
 readonly demoRole = signal<UserRole>('admin');
 readonly reportError = signal('');
 readonly ratings = signal<Rating[]>(structuredClone(collections.ratings));
 readonly ratingComments = signal<Record<string,string>>({});
 readonly search = signal({ sexes:['woman'],minAge:25,maxAge:45,distance:50,orientation:'any',minStars:0,minRatings:0 });
 readonly incoming = signal({ sexes:['woman','man'],minAge:25,maxAge:55,distance:100,minStars:0,minRatings:0 });
 readonly visible = signal(true);
 readonly hiddenCities = signal<string[]>(['sevilla']);
 readonly blocked = signal<string[]>([]);
 // Rejections are directional: demo -> other and other -> demo are different events.
 readonly rejectedByMe = signal<Record<string,RejectionReason>>({});
 readonly rejectedMe = signal<string[]>([]);
 readonly secondChance = signal(false);
 readonly chatFilter = signal<'all'|'unread'|'recent'>('all');
 readonly chatQuery = signal('');
 readonly conversationStates = signal<ConversationState[]>(collections.conversations.map(c=>({conversationId:c.id,status:'active',closedBy:null,closedAt:null})));
 readonly rejectionMessages = signal<RequestRejection[]>([]);
 readonly notifications = signal<DemoNotification[]>([
  {id:'notification-demo-1',kind:'request',text:'Ana quiere iniciar una conversación contigo.',createdAt:'Demo',read:false,relatedId:'req-1'}
 ]);
 readonly showArchived = signal(false);
 readonly maxPendingRequests = 5;
 readonly maxReportsPerTarget = 3;
 readonly userAlerts = signal<string[]>([]);
 private notify(kind:NotificationKind,text:string,relatedId:string|null=null){
  this.notifications.update(v=>[{id:'notification-'+Date.now()+'-'+Math.random().toString(36).slice(2),kind,text,createdAt:new Date().toLocaleString('es-ES'),read:false,relatedId},...v]);
 }
 unreadNotifications(){return this.notifications().filter(n=>!n.read).length;}
 markNotificationsRead(){this.notifications.update(v=>v.map(n=>({...n,read:true})));}
 activeChat(id:string){return this.conversationStates().find(c=>c.conversationId===id)?.status!=='closed';}
 closeChat(id:string):boolean{
  const c=this.chats().find(c=>c.id===id&&c.memberIds.includes('demo'));
  if(!c||!this.activeChat(id))return false;
  this.conversationStates.update(v=>v.some(x=>x.conversationId===id)?v.map(x=>x.conversationId===id?{...x,status:'closed',closedBy:'demo',closedAt:new Date().toISOString()}:x):[...v,{conversationId:id,status:'closed',closedBy:'demo',closedAt:new Date().toISOString()}]);
  this.notify('closed','Has finalizado la conversación con '+(this.person(c.memberIds.find(x=>x!=='demo')??'')?.name??'esta persona')+'.',id);
  return true;
 }
 withdrawRequest(id:string):boolean{
  const r=this.requests().find(x=>x.id===id&&x.fromId==='demo'&&x.status==='pending');
  if(!r)return false;
  this.requests.update(v=>v.map(x=>x.id===id?{...x,status:'withdrawn'}:x));
  this.notify('system','Has retirado una solicitud pendiente.',id);
  return true;
 }
 blockPerson(id:string):void{
  if(id==='demo'||!this.person(id)||this.blocked().includes(id))return;
  this.blocked.update(v=>[...v,id]);
  this.requests.update(v=>v.map(r=>r.status==='pending'&&((r.fromId===id&&r.toId==='demo')||(r.fromId==='demo'&&r.toId===id))?{...r,status:'rejected'}:r));
  this.chats().filter(c=>c.memberIds.includes('demo')&&c.memberIds.includes(id)).forEach(c=>this.closeChat(c.id));
  this.notify('system','Has bloqueado a '+(this.person(id)?.name??'esta persona')+'.',id);
 }
 unblockPerson(id:string){this.blocked.update(v=>v.filter(x=>x!==id));}


 ratingStats(id:string):{average:number,count:number}{
  const values=this.ratings().filter(r=>r.toId===id);
  return {average:values.length?values.reduce((sum,r)=>sum+r.stars,0)/values.length:0,count:values.length};
 }
 canRate(id:string):boolean{
  const conversation=this.chats().find(c=>c.memberIds.includes('demo')&&c.memberIds.includes(id));
  if(!conversation)return false;
  const messages=this.messages().filter(m=>m.conversationId===conversation.id);
  return messages.some(m=>m.fromId==='demo')&&messages.some(m=>m.fromId===id);
 }
 myRating(id:string):number{return this.ratings().find(r=>r.fromId==='demo'&&r.toId===id)?.stars??0;}
 rate(id:string,stars:number,comment=''):void{
  if(!this.canRate(id))return;
  if(id==='demo'||!this.person(id)||!Number.isInteger(stars)||stars<1||stars>5)return;
  this.ratingComments.update(v=>({...v,[id]:comment.trim().slice(0,500)}));
  this.ratings.update(all=>{
   const current=all.find(r=>r.fromId==='demo'&&r.toId===id);
   return current?all.map(r=>r===current?{...r,stars}:r):[...all,{id:'rating-'+Date.now(),fromId:'demo',toId:id,stars}];
  });
 }
 ratingsReceived(id='demo'):Rating[]{return this.ratings().filter(r=>r.toId===id);}
 meetsRating(id:string,minStars:number,minRatings:number):boolean{
  const s=this.ratingStats(id);
  return s.average>=minStars&&s.count>=minRatings&&(minStars===0||s.count>0);
 }
 canMessageMe(id:string):boolean{
  const p=this.person(id),f=this.incoming();
  return !!p&&!this.blocked().includes(id)&&!this.rejectedByMe()[id]&&
   f.sexes.includes(p.sex)&&p.age>=f.minAge&&p.age<=f.maxAge&&p.distanceKm<=f.distance&&
   this.meetsRating(id,f.minStars,f.minRatings);
 }
 role(id:string):UserRole{return id==='demo'?this.demoRole():this.roles().find(r=>r.userId===id)?.role??'user';}
 canModerate():boolean{return this.demoRole()==='moderator'||this.demoRole()==='admin';}
 setRole(id:string,role:UserRole):void{
  if(this.demoRole()!=='admin'||id==='demo'||!this.person(id))return;
  this.roles.update(v=>v.some(r=>r.userId===id)?v.map(r=>r.userId===id?{...r,role}:r):[...v,{userId:id,role}]);
 }
 report(targetId:string,reason:ReportReason,details:string,messageId:string|null=null):boolean{
  this.reportError.set('');
  if(targetId==='demo'||!this.person(targetId)){this.reportError.set('No se puede denunciar este perfil.');return false;}
  if(messageId&&!this.messages().some(m=>m.id===messageId&&m.fromId===targetId)){this.reportError.set('Mensaje no válido.');return false;}
  if(!details.trim()){this.reportError.set('Describe brevemente lo sucedido.');return false;}
  if(this.reports().filter(r=>r.reporterId==='demo'&&r.targetId===targetId).length>=this.maxReportsPerTarget){this.reportError.set('Has alcanzado el límite de denuncias para este perfil.');return false;}
  this.reports.update(v=>[...v,{id:'report-'+Date.now()+'-'+v.length,reporterId:'demo',targetId,messageId,reason,details:details.trim().slice(0,1000),status:'pending',reviewedBy:null,resolution:null}]);
  this.notify('report','Tu denuncia se ha registrado y está pendiente de revisión.',targetId);
  return true;
 }
 reviewReport(id:string,status:ReportStatus,resolution:string):void{
  if(!this.canModerate()||!['reviewing','resolved','dismissed'].includes(status))return;
  this.reports.update(v=>v.map(r=>r.id===id?{...r,status,reviewedBy:'demo',resolution:resolution.trim().slice(0,1000)||null}:r));
  this.notify('report','Has actualizado el estado de una denuncia a '+status+'.',id);
 }
 city(id:string){return this.cities.find(c=>c.id===id)?.name??id;}
 person(id:string){return this.people().find(p=>p.id===id);}
 private excluded(id:string){return this.blocked().includes(id)||this.rejectedMe().includes(id)||(!this.secondChance()&&!!this.rejectedByMe()[id]);}
 discover():Person[]{
  const f=this.search();
  return this.people().filter(p=>p.id!=='demo'&&!this.excluded(p.id)&&f.sexes.includes(p.sex)&&p.age>=f.minAge&&p.age<=f.maxAge&&p.distanceKm<=f.distance&&this.meetsRating(p.id,f.minStars,f.minRatings)&&(f.orientation==='any'||p.orientation===f.orientation)).sort((a,b)=>a.distanceKm-b.distanceKm);
 }
 toggleBlocked(id:string){if(this.blocked().includes(id))this.unblockPerson(id);else this.blockPerson(id);}
 toggleCity(id:string){this.hiddenCities.update(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);}
 rejectPerson(id:string,reason:RejectionReason){if(id==='demo')return;this.rejectedByMe.update(v=>({...v,[id]:reason}));this.requests.update(v=>v.map(r=>r.fromId===id&&r.toId==='demo'&&r.status==='pending'?{...r,status:'rejected'}:r));}
 // Simulate a rejection by the other person. This cannot be overridden by "second chance".
 simulateRejectedMe(id:string){this.rejectedMe.update(v=>v.includes(id)?v:[...v,id]);}
 request(toId:string,text:string):boolean{
  if(!text.trim()||toId==='demo'||this.excluded(toId)||this.blocked().includes(toId)||this.requests().filter(r=>r.fromId==='demo'&&r.status==='pending').length>=this.maxPendingRequests||this.requests().some(r=>r.toId===toId&&r.fromId==='demo'&&r.status!=='withdrawn'))return false;
  this.requests.update(v=>[...v,{id:'req-'+Date.now(),fromId:'demo',toId,text:text.trim().slice(0,1000),status:'pending'}]);
  this.notify('system','Has enviado una solicitud a '+(this.person(toId)?.name??'una persona')+'.',toId);return true;
 }
 respond(id:string,accept:boolean,rejectionMessage=''){
  const r=this.requests().find(x=>x.id===id);
  if(!r||r.toId!=='demo'||r.status!=='pending')return;
  if(!accept){this.rejectPerson(r.fromId,'message_rejected');if(rejectionMessage.trim())this.rejectionMessages.update(v=>[...v,{requestId:id,message:rejectionMessage.trim().slice(0,300)}]);this.notify('rejected','Has rechazado la solicitud de '+(this.person(r.fromId)?.name??'una persona')+'.',id);return;}
  this.requests.update(v=>v.map(x=>x.id===id?{...x,status:'accepted'}:x));
  this.notify('accepted','Has aceptado la solicitud de '+(this.person(r.fromId)?.name??'una persona')+'.',id);
  if(!this.chats().some(c=>c.memberIds.includes(r.fromId))){
   const chatId='chat-'+Date.now()+'-'+r.fromId;
   this.chats.update(v=>[...v,{id:chatId,memberIds:['demo',r.fromId]}]);
   this.conversationStates.update(v=>[...v,{conversationId:chatId,status:'active',closedBy:null,closedAt:null}]);
   this.messages.update(v=>[...v,{id:'m-'+Date.now(),conversationId:chatId,fromId:r.fromId,text:r.text,time:'Ahora'}]);
  }
 }
 rejectMany(ids:string[]){for(const id of ids)this.respond(id,false);}
 pendingIncoming(){return this.requests().filter(r=>r.toId==='demo'&&r.status==='pending'&&!this.blocked().includes(r.fromId));}
 filteredChats():Chat[]{
  const q=this.chatQuery().trim().toLocaleLowerCase();
  let result=this.chats().filter(c=>{
   const other=c.memberIds.find(x=>x!=='demo')??'';
   return !this.blocked().includes(other)&&(this.showArchived()||this.activeChat(c.id))&&(!q||(this.person(other)?.name.toLocaleLowerCase().includes(q)??false));
  });
  if(this.chatFilter()==='recent')result=[...result].reverse();
  if(this.chatFilter()==='unread')return []; // No read receipts yet; show empty rather than invent unread status.
  return result;
 }
 send(conversationId:string,text:string){const c=this.chats().find(c=>c.id===conversationId&&c.memberIds.includes('demo'));if(!c||!this.activeChat(conversationId)||this.blocked().includes(c.memberIds.find(x=>x!=='demo')??'' )||!text.trim())return;this.messages.update(v=>[...v,{id:'m-'+Date.now()+'-'+this.messages().length,conversationId,fromId:'demo',text:text.trim().slice(0,1000),time:'Ahora'}]);}
}
