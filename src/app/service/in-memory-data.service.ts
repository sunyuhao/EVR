import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let evaluations = [
      {id: 11, name: 'Mr. SUN'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    let arms =[
      {id: 1, weapon: 'Bow'},
      {id: 2, weapon: 'Sword'},
      {id: 3, weapon: 'Wand'},
      {id: 4, weapon: 'Shield'}
    
    ]
    return {evaluations,arms};
  }
}