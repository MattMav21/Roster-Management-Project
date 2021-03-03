from flask import Blueprint
from app.models import User, Roster, Roster_Member

rosters_routes = Blueprint('rosters', __name__)

@rosters_routes.route('/', methods=["GET"])
def everybody():
    rosters = Roster.query.all()
    each_roster = {}
    idx = 0
    for roster in rosters:
        each_roster[idx] = {
            "id": rosters[idx].id,
            "name": rosters[idx].name,
            "notes": rosters[idx].notes,
            "user_id": rosters[idx].user_id,
        }
        idx+=1
    
    return each_roster
