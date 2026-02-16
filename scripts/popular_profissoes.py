from apps import db, create_app
from apps.authentication.models import Profissao

def popular_profissoes():
    app = create_app('Debug')
    with app.app_context():
        profissoes = [
            'Médico', 'Engenheiro', 'Professor', 'Advogado', 'Desenvolvedor',
            'Enfermeiro', 'Arquiteto', 'Designer', 'Contador', 'Vendedor'
        ]
        
        for nome in profissoes:
            if not Profissao.query.filter_by(nome=nome).first():
                db.session.add(Profissao(nome=nome))
        
        db.session.commit()
        print(f"Adicionadas {len(profissoes)} profissões ao banco de dados")

if __name__ == '__main__':
    popular_profissoes()