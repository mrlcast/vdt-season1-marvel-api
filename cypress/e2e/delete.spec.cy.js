describe('DELETE /characters', function(){
    before (function(){
        cy.setToken()
    })

    it('Remove personagem pelo seu ID',function(){
        const id = '62a0d9063d5db40016de9a47'
        cy.deleteCharacter(id).then(function(response){
                expect(response.status).to.eql(200)
            })
    })

    it('Não possibilita remover personagem pelo ID não cadastrado',function(){
        const id = '99999999999'
        cy.deleteCharacter(id).then(function(response){
                expect(response.status).to.eql(200)
            })
    })
})
        
    