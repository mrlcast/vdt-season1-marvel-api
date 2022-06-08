describe('GET /characters', function(){
    before (function(){
        cy.setToken()
    })

    it('Retorna a lista de personagens cadastrados',function(){
        cy.getCharacter().then(function(response){
                expect(response.status).to.eql(200)
            })
    })

    it('Busca o personagem por nome',function(){
        const nome = 'Peter Parker'
        cy.getCharacterByName(nome).then(function(response){
                expect(response.status).to.eql(200)
            })
    })

    it('Busca o personagem por id',function(){
        const id = '62a0c45c3d5db40016de99c9'
        cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(400)
            })
    })
    
    it('Busca o personagem por id deve retornar 404',function(){
        const id = '9999999999999999'
        cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(400)
            })
    })
})
        
    