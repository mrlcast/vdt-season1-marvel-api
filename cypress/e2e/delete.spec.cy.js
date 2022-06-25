describe('DELETE /characters', function(){
    before (function(){
        cy.setToken()
    })
    const id = '62b75719988a940016018a79'
    it('Remove personagem pelo seu ID',function(){
        cy.deleteCharacter(id).then(function(response){
                expect(response.status).to.eql(204)
            })
    })

    it('Não possibilita remover personagem pelo ID não cadastrado',function(){
        cy.deleteCharacter(id).then(function(response){
                expect(response.status).to.eql(404)
            })
    })
})
        
    