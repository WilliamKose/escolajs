var Curso = require('../../models/Curso');

function criarObjetoCurso() {
    return {
        curso: 'Português',
        sigla: 'PT'
    };
}

function verificarCursoValido(res) {
    expect(res.body)
        .to.be.an('object')
        .and.to.have.all.keys(['id', 'curso', 'sigla','createdAt', 'updatedAt','areaId']);
}

describe('API Cursos', function () {
    var dadosCurso;

    beforeEach(function (done) {
        Curso.truncar()
            .finally(done);
    });

    describe('Métodos CRUD', function() {
        it('Novo Curso', function(done) {
            request(express)
                .post('/api/cursos')
                .send(criarObjetoCurso())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(verificarCursoValido)
                .end(done);
        });

        it('Exibir Curso', function(done) {
            Curso.novaInstancia(criarObjetoCurso())
                .then(function(curso) {
                    request(express)
                        .get('/api/cursos/' + curso.get('id'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarCursoValido)
                        .end(done)
                })
                .catch(done);
        });

        it('Editar Curso', function(done) {
            Curso.novaInstancia(criarObjetoCurso())
                .then(function(curso) {
                    request(express)
                        .put('/api/cursos/' + curso.get('id'))
                        .send({curso: 'Matematica'})
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarCursoValido)
                        .expect(function(res) {
                            expect(res.body.curso)
                                .to.be.equal('Matematica');
                        })
                        .end(done)
                })
                .catch(done);
        });

        it('Excluir Curso', function(done) {
            Curso.novaInstancia(criarObjetoCurso())
                .then(function(curso) {
                    request(express)
                        .delete('/api/cursos/' + curso.get('id'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(res) {
                            expect(res.body)
                                .to.be.true;
                        })
                        .end(done)
                })
                .catch(done);
        });

        it('Listar Cursos', function(done) {
            Curso.novaInstancia(criarObjetoCurso())
                .then(function(curso) {
                    request(express)
                        .get('/api/cursos')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(res) {
                            expect(res.body)
                                .to.be.an('array')
                                .and.have.length(1);
                        })
                        .end(done)
                })
                .catch(done);
        });
    });

});