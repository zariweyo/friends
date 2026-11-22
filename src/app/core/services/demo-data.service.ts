import { Injectable, signal } from '@angular/core';
import collections from '../../../assets/mock/collections.json';

export type Person = (typeof collections.profiles)[number];
export type Request = (typeof collections.messageRequests)[number];
export type Chat = (typeof collections.conversations)[number];
export type Message = (typeof collections.messages)[number];

@Injectable({ providedIn: 'root' })
export class DemoDataService {
  readonly people = signal<Person[]>(structuredClone(collections.profiles));
  readonly requests = signal<Request[]>(structuredClone(collections.messageRequests));
  readonly chats = signal<Chat[]>(structuredClone(collections.conversations));
  readonly messages = signal<Message[]>(structuredClone(collections.messages));
  readonly cities = collections.cities;
  readonly search = signal({ sexes: ['woman'], minAge: 25, maxAge: 45, distance: 50, orientation: 'any' });
  readonly incoming = signal({ sexes: ['woman', 'man'], minAge: 25, maxAge: 55, distance: 100 });
  readonly visible = signal(true);
  readonly hiddenCities = signal<string[]>(['sevilla']);
  readonly blocked = signal<string[]>([]);

  city(id: string): string { return this.cities.find(c => c.id === id)?.name ?? id; }
  person(id: string): Person | undefined { return this.people().find(p => p.id === id); }
  discover(): Person[] {
    const f = this.search();
    return this.people().filter(p => p.id !== 'demo' && !this.blocked().includes(p.id) &&
      f.sexes.includes(p.sex) && p.age >= f.minAge && p.age <= f.maxAge && p.distanceKm <= f.distance &&
      (f.orientation === 'any' || p.orientation === f.orientation))
      .sort((a,b) => a.distanceKm - b.distanceKm);
  }
  toggleBlocked(id: string): void {
    this.blocked.update(v => v.includes(id) ? v.filter(x => x !== id) : [...v,id]);
  }
  toggleCity(id: string): void {
    this.hiddenCities.update(v => v.includes(id) ? v.filter(x => x !== id) : [...v,id]);
  }
  request(toId: string, text: string): void {
    if (!text.trim() || toId === 'demo' || this.blocked().includes(toId)) return;
    this.requests.update(v => [...v, { id: 'req-' + Date.now(), fromId: 'demo', toId, text: text.trim(), status: 'pending' }]);
  }
  respond(id: string, accept: boolean): void {
    const request = this.requests().find(r => r.id === id);
    if (!request) return;
    this.requests.update(v => v.map(r => r.id === id ? { ...r, status: accept ? 'accepted' : 'rejected' } : r));
    if (accept) {
      const otherId = request.fromId === 'demo' ? request.toId : request.fromId;
      if (!this.chats().some(c => c.memberIds.includes(otherId))) {
        const chatId = 'chat-' + Date.now();
        this.chats.update(v => [...v, { id: chatId, memberIds: ['demo', otherId] }]);
        this.messages.update(v => [...v, { id: 'm-' + Date.now(), conversationId: chatId, fromId: request.fromId, text: request.text, time: 'Ahora' }]);
      }
    }
  }
  send(conversationId: string, text: string): void {
    if (!text.trim()) return;
    this.messages.update(v => [...v, { id: 'm-' + Date.now(), conversationId, fromId: 'demo', text: text.trim(), time: 'Ahora' }]);
  }
}
