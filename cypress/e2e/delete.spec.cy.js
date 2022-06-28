describe('DELETE /characters', function(){
    const tochaHumana = {
        name:"Jhony Storm",
        alias:"Tocha Humana",
        team: ["Quarteto Fantástico"],
        active: true
    }
    
    context('Testes de exclusão', function(){
        
        before(function(){
            cy.postCharacter(tochaHumana).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })     
        
        it('Remove personagem pelo seu ID',function(){
            const id = Cypress.env('characterId')
            cy.deleteCharacter(id).then(function(response){
                expect(response.status).to.eql(204)
            })
        })
    
        it('Não possibilita remover personagem pelo ID não cadastrado',function(){
            const id = Cypress.env('characterId')
            cy.deleteCharacter(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })
    })
})
        
    