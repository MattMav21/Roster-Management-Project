from flask import Blueprint
from app.models import User, Roster, Roster_Member, Member

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

@rosters_routes.route('/<int:id>', methods=["GET"])
def roster(id):
    roster = Roster.query.get(id)

    roster_members = Roster_Member.query.filter(Roster_Member.roster_id == id).all()
    print("ROSTER MEMBERS!!!!!!!!!!!!!!!!!!!!!", roster_members)
    # this is good!

    correct_members_ids = []
    # [2, 4] if id is 2, [1, 3, 5] if id is 1

    idx = 0
    for member in roster_members:
        correct_members_ids.append(int(member.member_id))
        idx+=1

    print("CORR MEMBER IDS", correct_members_ids)

    correct_members = Member.query.filter(Member.id.in_(correct_members_ids)).all()

    print("CORR MEMBERS", correct_members)

    correct_object = {}
    
    count = 0
    for correct in correct_members:
        correct_object[count] = {
            "id": correct_members[count].id,
            "name": correct_members[count].id,
            "notes": correct_members[count].notes,
            "created_at": correct_members[count].created_at
        }

    print("OMG", correct_object)

    single_roster = {
        "id": roster.id,
        "name": roster.name,
        "notes": roster.notes,
        "user_id": roster.user_id,
        "this_roster": correct_object
    }

    return single_roster