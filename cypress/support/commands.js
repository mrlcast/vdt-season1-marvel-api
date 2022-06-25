Cypress.Commands.add('setToken', function(){
    cy.api({
        method:'POST',
        url: '/sessions',
        body : {
            email: 'marlon@qacademy.io',
            password:'qa-cademy'
        }
    }).then(function(response){
        expect(response.status).to.eql(200)
        Cypress.env('token',response.body.token)
    })
})
Cypress.Commands.add('back2ThePast',function(){
    cy.api({
        method:'DELETE',
        url: '/back2thepast/629e41d362354f001624ee49'
    }).then(function(response){
        expect(response.status).to.eql(200)
    })
})
Cypress.Commands.add('postCharacter',function(payload){
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

Cypress.Commands.add('getCharacters',function(){
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

Cypress.Commands.add('getCharacterByName',function(characterName){
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: { name: characterName},
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})
Cypress.Commands.add('getCharacterById',function(payload){
    cy.api({
        method: 'GET',
        url: '/characters/'+payload,
        name: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})
Cypress.Commands.add('deleteCharacter',function(payload){
    cy.api({
        method: 'DELETE',
        url: '/characters/'+payload,
        name: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

Cypress.Commands.add('populateCharacters', function(characters){
    
    characters.forEach(character => {
        cy.postCharacter(character)
    });
})