from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, HiddenField
from wtforms.validators import Email, DataRequired
from wtforms import SelectField

# login and registration


class LoginForm(FlaskForm):
    username = StringField('Username',
                         id='username_login',
                         validators=[DataRequired()])
    password = PasswordField('Password',
                             id='pwd_login',
                             validators=[DataRequired()])


class CreateAccountForm(FlaskForm):
    username = StringField('Username',
                         id='username_create',
                         validators=[DataRequired()])
    email = StringField('Email',
                      id='email_create',
                      validators=[DataRequired(), Email()])
    password = PasswordField('Password',
                             id='pwd_create',
                             validators=[DataRequired()])

# Clientes
class ClienteForm(FlaskForm):
    nome = StringField('Nome Completo', 
                      id='nome_cliente',
                      validators=[DataRequired()])
    email = StringField('Email',
                       id='email_cliente',
                       validators=[DataRequired(), Email()])
    telefone = StringField('Telefone',
                          id='telefone_cliente')
    endereco = TextAreaField('Endereço',
                            id='endereco_cliente')
    profissao_id = HiddenField('Profissão', validators=[DataRequired()])
    profissao_nome = StringField('Buscar Profissão', id='profissao_autocomplete')