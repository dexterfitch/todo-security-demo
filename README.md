# TODO Manager w/ Security

## TODO Data Model

    1. text         - String
    2. authorId     - int
    3. isPublic     - boolean
    4. createDate   - LocalDate

## Roles

    1. Guest/Anonymous Role
    2. Author/Standard User Role
    3. Admin Role

## User Stories

    As a ___________, I should [not] be able to ____________________.

    Preconditions: what must be true for the user story to be relevant.
    Postconditions: what must be true after the user story ends.
 
* [ ] As any user, I should be able to see all public Todos.
* [ ] As a guest, I should not be able to see any private Todos.
* [ ] As a guest, I should not be able to create a Todo.
* [ ] As a guest, I should not be able to remove a Todo.
* [ ] As a guest, I should not be able to edit a Todo.
* [ ] As a guest, I should be able to create an Author account.
* [ ] As a guest, I should be able to log in to an existing Author account.
* [ ] As an Author, I should be able to see _my own_ private Todos.
* [ ] As an Author, I should not be able to see other Author's private Todos.
* [ ] As an Author, I should be able to create a Todo.
* [ ] As an Author, I should be able to remove _my own_ Todos.
* [ ] As an Author, I should not be able to remove other Author's Todos.
* [ ] As an Author, I should be able to edit _my own_ Todos.
* [ ] As an Author, I should not be able to edit other Author's Todos.
* [ ] As an Admin, I should be able to see all Todos.
* [ ] As an Admin, I should be able to create a Todos.
* [ ] As an Admin, I should be able to remove all Todos.
* [ ] As an Admin, I should be able to edit all Todos.
* [ ] As an Admin, I should be able to promote an Author to Admin.
* [ ] As an Admin, I should be able to remove Author users.
* [ ] As an Admin, I should be able to edit the name of Authors.
* [ ] As an Admin, I should be able to change the password of Authors.

## Tasks
* [ ] Create Java API
    * [ ] Create Java Project (todo-with-security)
    * [ ] Modify pom.xml to include the following dependencies
        * [ ] spring-boot-start-security
        * [ ] jjwt-api
        * [ ] jjwt-impl
        * [ ] jjwt-jackson
        * [ ] mysql-connector-java
        * [ ] spring-boot-starter-jdbc
* [ ] Create React Front-End