# treffen-app

Treffen App



## Features

- **Register**: Der User kann sich einen Account erstellen und meldet sich damit automatisch an
- **Login**: Der User kann über eine Anmelde-Maske sich in seinen Account einloggen
- **Logout**: Der User kann sich aus seinem Account wieder ausloggen


### Optional Features - 1


### Optional Features - 2


- **Such-Funktion**: Der User kann nach einem Search-Term über die Events-Liste filtern


## Models
<!-- 
![Model-Relations](images/Model-Relations.png) 
-->


## Endpunkte

### POST /user/login

logged user ein

Body:
```javascript
{
  email: "my@mail.de",
  password: "123456"
}
```

Response:
```javascript
{
  id: "adasdqwqqqf",
  email: "my.mail.de",
  name: "Hans Müller",
}
```

### POST /user/register

erstellt einen neuen user und loggt ihn ein

Body:
```javascript
{
    vorname: "...",
    nachname: "...",
    email: 'my@mail.de',
    password: '...',
    age:  30,
    gender: 'male',
    bild: 'img.jpg'
    telefonenummer: '00491'
}
```

Response:
```javascript
[
  {
    vorname: "...",
    nachname: "...",
    email: 'my@mail.de',
    gender: '',
    age:  30,
    password: '...',
    bild: 'img.jpg',
    telefonenummer: '00491'
    token: '12kasdfasdf',
    _id: "kj23föj23följö",
  }
]
```

### POST /user/logout

der usertoken cookie wird gelöscht. der token wird aus der datenbank entfernt

Body:
```javascript
{}
```
Response:
```javascript
true
```

### GET /events

liefert eine liste aller Events zurück

* If Title in search Feld bekannt ist, liefert nur die mached Titles 

Response:
```javascript
[
  {
    title: "Event title",
    adresse: "...",
    datum: '  ',
    user: { user.ObjectId },
    category: [ 1, 2, 3 ], //enum: [1, 2, 3]
    bild: '.jpg',
    _id: "kj23föj23följö",
  }
]
```
### GET /events/search

bekommen wir alle mached Events


### GET /events/:id

liefert eine Information über ein Event zurück

Response:
```javascript
{
  title: "Event title",
  adresse: "...",
  datum: '  ',
  user: { user.ObjectId },
  category: [1,2,3],
  description: "text.. ",
  _id: "kj23föj23följö",
  bild: '.jpg',
  comments: [ {
    description: 'description ObjectId',
    user: {user ObjectId}  // name, bild
  }],
  map: 'https://www.google.de/maps/place/{adresse}'
}
```

### POST /events/:id/join

 Nach Einloggen des User, kann ein Event durch sein Token teilnehmen

Body:
```javascript
{
    event: {event.ObjectId, req.params},
    user: { user.ObjectId , require: true}, 
}
```
Response:
```javascript
[
  {
    user: { user.ObjectId },
    _id: "kj23föj23följö",
  }
]
```

### POST /user/new-event

erstellt ein neues Event gehört dem selben (User)

Body:
```javascript
{
    title: "Event title",
    adresse: "...",
    datum: '  '
    user: { user.ObjectId },
    category: [1,2,3],
    description: "text.. "
}
```

Response:
```javascript
[
  {
    title: "Event title",
    adresse: "...",
    date: '  '
    user: { user.ObjectId },
    category: [1,2,3],
    description: "text.. "
    _id: "kj23föj23följö",
  }
]
```

### GET /user/events

liefert eine liste aller Events die zum User gehören zurück

Response:
```javascript
[
  {
    title: "Event title",
    ort: "...",
    date: '  '
    owner: { user.ObjectId },
    public: true,
    description: "text.. "
    _id: "kj23föj23följö",
  }
]