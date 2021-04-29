# zocom-home-master-Jonathan
Building an api for controlling zocom-home-master devices.

Efter localhost skriv: 
/api/<<Enhetens ID>>/<<Vad man vill göra>>

Exemplen på URL:

/api/LOC1/lock

/api/LOC1/unlock
  Här måste man skicka in ett JSON objekt i request bodyn som ser ut så här: 
  ```
  {
    "code": "1234"
  }
  ```
  
/api/AC1/on

/api/LIG1/on

Man kan även lägga till en query-sträng ifall enheten har en egenskap man vill kunna ändra på. Tex:

/api/AC1/on?temp=20
Bestämmer temperaturen på AC:n.

/api/LIG1/on?brig=0.6
Bestämmer ljusstyrkan på lampan.
