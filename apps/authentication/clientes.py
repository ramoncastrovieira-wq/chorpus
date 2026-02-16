from flask import render_template, request, redirect, url_for, flash
from flask_login import login_required
from apps.authentication.forms import ClienteForm
from apps.authentication.models import Clientes
from apps import db
from apps.authentication.models import Profissao
from flask import jsonify

# Importa o blueprint do módulo atual
from . import blueprint

@blueprint.route('/clientes', methods=['GET'])
@login_required
def listar_clientes():
    clientes = Clientes.query.all()
    return render_template('accounts/clientes/listar.html', clientes=clientes)

@blueprint.route('/clientes/adicionar', methods=['GET', 'POST'])
@login_required
def adicionar_cliente():
    form = ClienteForm(request.form)
    
    if request.method == 'POST' and form.validate():
        cliente = Clientes(**form.data)
        db.session.add(cliente)
        db.session.commit()
        flash('Cliente adicionado com sucesso!', 'success')
        return redirect(url_for('authentication_blueprint.listar_clientes'))
    
    return render_template('accounts/clientes/editar.html', form=form)

@blueprint.route('/clientes/editar/<int:id>', methods=['GET', 'POST'])
@login_required
def editar_cliente(id):
    cliente = Clientes.query.get_or_404(id)
    form = ClienteForm(obj=cliente)
    
    # Pré-carrega o nome da profissão se existir
    profissao_nome = ''
    if cliente.profissao_id:
        profissao = Profissao.query.get(cliente.profissao_id)
        profissao_nome = profissao.nome if profissao else ''
    
    if request.method == 'POST' and form.validate():
        form.populate_obj(cliente)
        db.session.commit()
        flash('Cliente atualizado com sucesso!', 'success')
        return redirect(url_for('authentication_blueprint.listar_clientes'))
    
    return render_template('accounts/clientes/editar.html', 
                         form=form, 
                         cliente=cliente,
                         profissao_nome=profissao_nome)

@blueprint.route('/clientes/excluir/<int:id>', methods=['POST'])
@login_required
def excluir_cliente(id):
    cliente = Clientes.query.get_or_404(id)
    db.session.delete(cliente)
    db.session.commit()
    flash('Cliente excluído com sucesso!', 'success')
    return redirect(url_for('authentication_blueprint.listar_clientes'))

@blueprint.route('/profissoes/autocomplete', methods=['GET'])
@login_required
def profissao_autocomplete():
    search = request.args.get('q')
    query = Profissao.query.filter(Profissao.nome.ilike(f'%{search}%')).limit(10)
    profissoes = [{'id': p.id, 'text': p.nome} for p in query]
    return jsonify(results=profissoes)