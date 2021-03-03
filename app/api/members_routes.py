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
