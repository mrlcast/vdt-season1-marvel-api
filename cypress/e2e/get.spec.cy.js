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
        const id = '62b74c75988a940016018944'
        cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)
            })
    })
    
    it.only('Busca o personagem por id deve retornar 404',function(){
        const id = '62b75758988a940016018a85'
        cy.deleteCharacter(id)
        cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
    })
})
        
    