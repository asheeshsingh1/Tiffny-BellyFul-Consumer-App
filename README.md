<!-- # Tiffny-BellyFul-Consumer-App -->
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://1drv.ms/u/s!Ar_vfbHCB9exc2gL-vC3tKlqaXo?e=QzYVfC">
    <img src="https://en.pimg.jp/060/799/223/1/60799223.jpg" alt="Logo" width="160" height="150">
  </a>

  <h3 align="center">Tiffny BellyFul Consumer App</h3>

  
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
* Project aims at Vendor interaction with Tiffny BellyFul App.
* Consumer can add, read , update or delete a Orders or a Review rating under Orders.



Functionalities:
* Consumer needs to authorize first, or just register himself/herself.
* After authorization vendor can add, read, update or delete the orders and ratings or a menu item.
* If Consumer is not authorised or parameters passed are not appropriate then error will be shown to the vendor.

### Built With
[NodeJs]    
[Javascript]  
[PostGreSQL with Mongoose]
[Mongoose]
[JWT]
[BCRYPTJS]

<!-- GETTING STARTED -->
## Getting Started

Want to run on your device locally??    
Follow the procedure below

### Prerequisites

1. Install nodeJs
2. Clone the repo
3. run command: cd TodoApp
4. run command: npm start
5. Voilla! application is UP


### Installation

Clone the repo
   ```sh
   gh repo clone asheeshsingh1/Tiffny-BellyFul-Consumer-App
   ```



## Postman Collection

Link : https://www.getpostman.com/collections/e0396a92f0e5b35dfc8a
<!-- 
## Schema
Please visit : 
https://dbdiagram.io/d/625899302514c9790333d49e -->


## Meta Info
* Currently the apps supports simple interaction of Consumer with restraunt and menu items registered with restraunt and create ratings for the same.
* A single Consumer can have multiple Orders with different or same restraunt, but therefore a single rating for a single order.
* Later every time when a Consumer places an order we insert that row in the PostGreSQL Database and same is being done for a Rating.
* So from Orders,Ratings Table, we will be able to fetch:

<ol>
    <li>All the Orders created by the Consumer</li>
    <li>Particular orders or Review rating created by the Consumer</li>
</ol>

* Instead of storing plain password in database, we can store hashed password using bcryptjs library of JS. While authenticating the user we can simple match the hashed password with the password stored in DB.
* We can also add a default page for requests that does not map for any url.

<!-- CONTACT -->
## Contact

Asheesh Singh - [Linked in](https://github.com/asheeshsingh1/)




[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://github.com/asheeshsingh1/
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
