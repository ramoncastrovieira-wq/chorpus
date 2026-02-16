from flask import Blueprint

# Cria o blueprint primeiro
blueprint = Blueprint(
    'authentication_blueprint',
    __name__,
    url_prefix=''
)

# Importa as rotas DEPOIS de criar o blueprint
from . import routes
from . import clientes