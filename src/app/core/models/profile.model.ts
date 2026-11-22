export type Sex='woman'|'man'|'other';
export type Orientation='heterosexual'|'homosexual'|'bisexual'|'other'|'prefer_not_to_say';
export interface RangeFilter{minAge:number;maxAge:number;maxDistanceKm:number;sexes:Sex[];}
export interface SearchPreferences extends RangeFilter{orientations:Orientation[];}
export interface IncomingMessageRules extends RangeFilter{}
export interface Profile{uid:string;name:string;birthDate:string;sex:Sex;cityId:string;cityName:string;photoUrl:string|null;lastSeenAt:string|null;visible:boolean;hiddenCityIds:string[];searchPreferences:SearchPreferences;incomingMessageRules:IncomingMessageRules;blockedUserIds:string[];}
