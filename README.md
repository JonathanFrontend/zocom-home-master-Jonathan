# zocom-home-master-Jonathan
Building an api for controlling zocom-home-master devices.

Exemplen på URL:
http://localhost:3000/api/LOC1/unlock
  Här måste man skicka in ett JSON objekt i request bodyn som ser ut så här: 
  ```
  {
    "code": "1234"
  }
  ```
http://localhost:3000/api/AC1/on?temp=20

http://localhost:3000/api/LIG1/on?brig=0.6
