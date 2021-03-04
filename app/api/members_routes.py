from flask import Blueprint
from app.models import User, Member

members_routes = Blueprint('members', __name__)

@members_routes.route('/', methods=["GET"])
def everybody():
    members = Member.query.all()
    ppl = {}
    idx = 0
    for member in members:
        ppl[idx] = {
            "id": members[idx].id,
            "name": members[idx].name,
            "notes": members[idx].notes,
            "created_at": members[idx].created_at,
        }
        idx+=1
    
    return ppl


@members_routes.route('/<int:id>', methods=["GET"])
def person(id):
    member = Member.query.get(id)
    single_person = {
        "id": member.id,
        "name": member.name,
        "notes": member.notes,
        "created_at": member.created_at,
    }
    return single_person


@members_routes.route('/create', methods=["GET"])
def form_for_new_members():
    return "LOL"