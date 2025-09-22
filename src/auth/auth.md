auth/register -> Cria um usuário conforme o createUserDTO, manda esse DTO para o create do service que cria o usúario e manda para o banco de dados com a senha hashed.


auth/login -> Loga o usuário conforme o loginDTO, o front tem um requisição post que manda um payload com as informações de login, se as informações estiverem corretas(o back vai decifrar a senha e mandar (true or false)), caso seja true, ele cria um acessToken que é salvo no localStorage do front-end.


auth/validate -> Toda vez que alguém tenta entrar em um uma rota que tem o guard(no front), ele manda o token para o back-end validar e ver se realmente aquele token existe e que n seja um valor aleatório que o usúario malicioso colocou para tentar acessar a home da nossa pagina web...