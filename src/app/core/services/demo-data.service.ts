import { Injectable, signal } from '@angular/core';
import collections from '../../../assets/mock/collections.json';
export type Person = (typeof collections.profiles)[number];
export type Request = (typeof collections.messageRequests)[number];
export type Chat = (typeof collections.conversations)[number];
export type Message = (typeof collections.messages)[number];
export type Rating = (typeof collections.ratings)[number];
export type RejectionReason = 'not_my_type' | 'message_rejected';

@Injectable({ providedIn: 'root' })
export class DemoDataService {
 readonly people = signal<Person[]>(structuredClone(collections.profiles));
 readonly requests = signal<Request[]>(structuredClone(collections.messageRequests));
 readonly chats = signal<Chat[]>(structuredClone(collections.conversations));
 readonly messages = signal<Message[]>(structuredClone(collections.messages));
 readonly cities = collections.cities;
 readonly ratings = signal<Rating[]>(structuredClone(collections.ratings));
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

 ratingStats(id:string):{average:number,count:number}{
  const values=this.ratings().filter(r=>r.toId===id);
  return {average:values.length?values.reduce((sum,r)=>sum+r.stars,0)/values.length:0,count:values.length};
 }
 myRating(id:string):number{return this.ratings().find(r=>r.fromId==='demo'&&r.toId===id)?.stars??0;}
 rate(id:string,stars:number):void{
  if(id==='demo'||!this.person(id)||!Number.isInteger(stars)||stars<1||stars>5)return;
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
 city(id:string){return this.cities.find(c=>c.id===id)?.name??id;}
 person(id:string){return this.people().find(p=>p.id===id);}
 private excluded(id:string){return this.blocked().includes(id)||this.rejectedMe().includes(id)||(!this.secondChance()&&!!this.rejectedByMe()[id]);}
 discover():Person[]{
  const f=this.search();
  return this.people().filter(p=>p.id!=='demo'&&!this.excluded(p.id)&&f.sexes.includes(p.sex)&&p.age>=f.minAge&&p.age<=f.maxAge&&p.distanceKm<=f.distance&&this.meetsRating(p.id,f.minStars,f.minRatings)&&(f.orientation==='any'||p.orientation===f.orientation)).sort((a,b)=>a.distanceKm-b.distanceKm);
 }
 toggleBlocked(id:string){this.blocked.update(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);}
 toggleCity(id:string){this.hiddenCities.update(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);}
 rejectPerson(id:string,reason:RejectionReason){if(id==='demo')return;this.rejectedByMe.update(v=>({...v,[id]:reason}));this.requests.update(v=>v.map(r=>r.fromId===id&&r.toId==='demo'&&r.status==='pending'?{...r,status:'rejected'}:r));}
 // Simulate a rejection by the other person. This cannot be overridden by "second chance".
 simulateRejectedMe(id:string){this.rejectedMe.update(v=>v.includes(id)?v:[...v,id]);}
 request(toId:string,text:string):boolean{
  if(!text.trim()||toId==='demo'||this.excluded(toId)||this.requests().some(r=>r.toId===toId&&r.fromId==='demo'))return false;
  this.requests.update(v=>[...v,{id:'req-'+Date.now(),fromId:'demo',toId,text:text.trim(),status:'pending'}]);return true;
 }
 respond(id:string,accept:boolean){
  const r=this.requests().find(x=>x.id===id);
  if(!r||r.toId!=='demo'||r.status!=='pending')return;
  if(!accept){this.rejectPerson(r.fromId,'message_rejected');return;}
  this.requests.update(v=>v.map(x=>x.id===id?{...x,status:'accepted'}:x));
  if(!this.chats().some(c=>c.memberIds.includes(r.fromId))){
   const chatId='chat-'+Date.now()+'-'+r.fromId;
   this.chats.update(v=>[...v,{id:chatId,memberIds:['demo',r.fromId]}]);
   this.messages.update(v=>[...v,{id:'m-'+Date.now(),conversationId:chatId,fromId:r.fromId,text:r.text,time:'Ahora'}]);
  }
 }
 rejectMany(ids:string[]){for(const id of ids)this.respond(id,false);}
 pendingIncoming(){return this.requests().filter(r=>r.toId==='demo'&&r.status==='pending'&&!this.blocked().includes(r.fromId));}
 filteredChats():Chat[]{
  const q=this.chatQuery().trim().toLocaleLowerCase();
  let result=this.chats().filter(c=>{
   const other=c.memberIds.find(x=>x!=='demo')??'';
   return !this.blocked().includes(other)&&(!q||(this.person(other)?.name.toLocaleLowerCase().includes(q)??false));
  });
  if(this.chatFilter()==='recent')result=[...result].reverse();
  if(this.chatFilter()==='unread')return []; // No read receipts yet; show empty rather than invent unread status.
  return result;
 }
 send(conversationId:string,text:string){if(!text.trim())return;this.messages.update(v=>[...v,{id:'m-'+Date.now(),conversationId,fromId:'demo',text:text.trim(),time:'Ahora'}]);}
}
