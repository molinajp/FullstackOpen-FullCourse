const user = {
  name: 'name for tests',
  username: 'testuser',
  password: 'testpass'
}

const anotherUser = {
  name: 'name2 for tests',
  username: 'test2user',
  password: 'test2pass'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(`${user.username}`)
      cy.get('#password').type(`${user.password}`)
      cy.get('#login-button').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type(`${user.username}`)
      cy.get('#password').type(`${user.password}`)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-note').click()
      cy.get('#title').type('Title for test')
      cy.get('#author').type('Author for test')
      cy.get('#url').type('url.test.com')
      cy.get('#create-blog').click()
      cy.contains('Title for test by Author for test')
    })

    describe('When there is a blog', function() {
      beforeEach(function() {
        cy.get('#new-note').click()
        cy.get('#title').type('Title for test')
        cy.get('#author').type('Author for test')
        cy.get('#url').type('url.test.com')
        cy.get('#create-blog').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted by same user', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.successful').should('contain', 'has been successfully removed')
          .and('have.css', 'color', 'rgb(0, 100, 0)')
      })

      it('A blog cannot be deleted by another user', function() {
        cy.get('#logout').click()
        cy.get('#username').type(`${anotherUser.username}`)
        cy.get('#password').type(`${anotherUser.password}`)
        cy.get('#login-button').click()
        cy.contains('view').click()
        cy.contains('remove').should('not.be.visible')
      })

      describe('When there is two blogs', function() {
        beforeEach(function() {
          cy.contains('view').click()
          cy.contains('like').click()
          cy.get('#new-note').click()
          cy.get('#title').type('Second blog')
          cy.get('#author').type('Author for second blog')
          cy.get('#url').type('url.test2.com')
          cy.get('#create-blog').click()
        })

        it('check that is ordered by likes without adding extra likes', function(){
          cy.get('.blog').eq(0).should('contain', 'Title for test')
          cy.get('.blog').eq(1).should('contain', 'Second blog')
        })

        it('check that is ordered by likes with more likes to second blog', function(){
          cy.contains('hide').click()
          cy.contains('Second blog').find('button').click()
          for(let i = 0; i < 5; i++){
            cy.contains('like').click()
            cy.wait(1000)
          }
          cy.get('.blog').eq(0).should('contain', 'Second blog')
          cy.get('.blog').eq(1).should('contain', 'Title for test')
        })

      })
    })

  })


})