describe('DELETE /characters', function(){
    before (function(){
        cy.setToken()
    })
    const id = '62b75daa988a940016018b6f'
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
        
    