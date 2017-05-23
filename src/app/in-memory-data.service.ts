import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. SUN', type:'archer'},
      {id: 12, name: 'Narco', type:'archer'},
      {id: 13, name: 'Bombasto', type:'archer'},
      {id: 14, name: 'Celeritas', type:'warrior'},
      {id: 15, name: 'Magneta', type:'warrior'},
      {id: 16, name: 'RubberMan', type:'warrior'},
      {id: 17, name: 'Dynama', type:'warrior'},
      {id: 18, name: 'Dr IQ', type:'wizard'},
      {id: 19, name: 'Magma', type:'wizard'},
      {id: 20, name: 'Tornado', type:'wizard'}
    ];
    let arms =[
      {id: 1, weapon: 'Bow'},
      {id: 2, weapon: 'Sword'},
      {id: 3, weapon: 'Wand'},
      {id: 4, weapon: 'Shield'}
    
    ]
    return {heroes,arms};
  }
}