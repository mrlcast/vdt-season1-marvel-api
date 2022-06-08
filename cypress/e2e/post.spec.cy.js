describe('POST /characters', function(){
    before (function(){
        cy.setToken()
        cy.back2ThePast()
    })

    context('Cadastro de personagens',function(){
        it('Deve cadastrar um personagem', function(){
            const character = {
                name:'Peter Parker',
                alias:'Miranha',
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(201)
                expect(response.body.character_id.length).to.eql(24)
            })
        })
        
        context('Quando o personagem já existe',function(){
        
            const character = {
                name:'Steve Rogers',
                alias:'Cap',
                team: ['Vingadores'],
                active: true
            }
            
            before(function(){
                cy.postCharacter(character).then(function(response){
                    expect(response.status).to.eql(201)
                })
            })
            
            it('Não deve cadastrar personagem duplicado', function(){
                cy.postCharacter(character).then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
            })
        })
    })
    
    context('Validações dos campos',function(){
        
        it('Campo idade - deve ser um número',function(){
            var character = {
                name:'Steve Rogers',
                alias:'Cap',
                age:' ',
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql("\"age\" must be a number")
            })
        })

        it('Campo nome - não pode ser vazio',function(){
            var character = {
                name:'',
                alias:'Cap',
                age:200,
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql("\"name\" is not allowed to be empty")
            })
        })

        it('Campo nome - deve ser string',function(){
            var character = {
                name:null,
                alias:'Cap',
                age:200,
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql("\"name\" must be a string")
            })
        })

        it('Campo alias - não pode ser vazio',function(){
            var character = {
                name:'Steve Rogers',
                alias:'',
                age:220,
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql("\"alias\" is not allowed to be empty")
            })
        })

        it('Campo alias - não pode ser vazio',function(){
            var character = {
                name:'Steve Rogers',
                alias:null,
                age:220,
                team: ['Vingadores'],
                active: true
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql("\"alias\" must be a string")
            })
        })

        it('Campo time - deve ser um array',function(){
            var character = {
                name:'Steve Rogers',
                alias:'Cap',
                age:200,
                team:null,
                active: true
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql("\"team\" must be an array")
            })
        })

        it('Campo ativo - deve ser um booleano',function(){
            var character = {
                name:'Steve Rogers',
                alias:'Cap',
                age:200,
                team: ['Vingadores'],
                active:null
            }
    
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql("\"active\" must be a boolean")
            })
        })

        context('Campos obrigatórios',function(){
                
            it('Campo Nome',function(){
                var character = {
                    alias:'Cap',
                    age:'220',
                    team: ['Vingadores'],
                    active: true
                }
    
                cy.postCharacter(character).then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql("\"name\" is required")
                })
            })
            
            it('Campo alias',function(){
                var character = {
                    name:'Steve Rogers',
                    age:'220',
                    team: ['Vingadores'],
                    active: true
                }
    
                cy.postCharacter(character).then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql("\"alias\" is required")
                })
            })
    
            it('Campo team',function(){
                var character = {
                    alias:'Cap',
                    age:'220',
                    name: 'Steve Rogers',
                    active: true
                }
    
                cy.postCharacter(character).then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql("\"team\" is required")
                })
            })
    
            it('Campo active',function(){
                var character = {
                    alias:'Cap',
                    name: 'Steve Rogers',
                    age:'220',
                    team: ['Vingadores']
                }
    
                cy.postCharacter(character).then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql("\"active\" is required")
                })
            })
    
        })
    })
    

})