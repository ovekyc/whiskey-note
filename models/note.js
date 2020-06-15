import uuid from 'react-native-uuid';

export default class Note {
  constructor() {
    this.id = uuid.v4();
    this.info = {
      name: null,
      country: null,
      region: null,
      type: null,
      age: null,
      strength: null
    },
    this.color = {
      data: {
        code: null
      },  
      rating: 0
    },
    this.aroma = {
      data: new Flavors(),
      rating: 0
    },
    this.palate = {
      data: new Flavors(),
      rating: 0
    },
    this.finish = {
      notes: '',
      rating: 0
    },
    this.notes = '',
    this.totalScore = 0
  }

  toJSON() {
    const {id, info, color, aroma, palate, finish, notes, totalScore} = this;
    return {
      id, info, color, finish, notes, totalScore,
      aroma: { data: aroma.data.toJSON(), rating: aroma.rating },
      palate: { data: aroma.data.toJSON(), rating: palate.rating }
    }
  }
}

class Flavors {
  constructor() {
    this.woody = 0,
    this.sulphury = 0,
    this.feinty = 0,
    this.peaty = 0,
    this.floral = 0,
    this.fruity = 0,
    this.cereal = 0,
    this.winy = 0
  }

  toJSON() {
    const {woody, sulphury, feinty, peaty, floral, fruity, cereal, winy} = this;
    return {woody, sulphury, feinty, peaty, floral, fruity, cereal, winy};
  }
}
