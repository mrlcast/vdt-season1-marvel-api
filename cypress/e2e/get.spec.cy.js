describe('GET /characters', function(){
    
    const characters = [
        {
            name: 'Wanda Massimoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        },
        {
            name: 'Pietro Massimoff',
            alias: 'Mercúrio',
            team: ['Vingadores'],
            active: true
        },
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['X-men'],
            active: true
        }
    ] 

    before (function(){
        cy.setToken()
        cy.back2ThePast()
        cy.populateCharacters(characters)
    })

    it('Retorna a lista de personagens cadastrados',function(){
        cy.getCharacters().then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body).to.be.a('array')
                expect(response.body.length).greaterThan(0)
            })
    })

    it('Busca o personagem por nome',function(){
        cy.getCharacterByName('Charles').then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(1)
                expect(response.body[0].alias).to.eql('Professor X')
                expect(response.body[0].team).to.eql([ 'X-men' ])
                expect(response.body[0].active).to.eql(true)
            })
    })
})
        
describe('GET/characters/id', function(){
    const tonyStark = {
            name:"Tony Stark",
            alias:"Homem de Ferro",
            team: ["Vingadores"],
            active: true
    }

    before (function(){
        cy.setToken()
        cy.back2ThePast()
    })

    context('quando tenho um personagem criado', function(){
        
        before(function(){
            cy.postCharacter(tonyStark).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it.only('Busca o personagem pelo id', function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de Ferro')
                expect(response.body.team).to.eql([ 'Vingadores' ])
                expect(response.body.active).to.eql(true)
            })
        })

        it('Busca o personagem inexistente por id deve retornar 404',function(){
            const id = '62b75758988a940016018a89'

            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })
    })
})
    