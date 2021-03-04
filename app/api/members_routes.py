from flask import Blueprint, request, redirect
from app.models import db, User, Member
from app.forms import MemberCreateForm
from datetime import datetime

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
    member = Member.query.get_or_404(id)
    single_person = {
        "id": member.id,
        "name": member.name,
        "notes": member.notes,
        "created_at": member.created_at,
    }
    return single_person


@members_routes.route('/create', methods=["GET", "POST"])
def form_for_new_members():
    print("REQUEST!", request.data)
    form = MemberCreateForm()
    if request.method == "POST":
        print("ATTEMPTING TO POST!!")
        if form.validate_on_submit:
            data = form.data
            print("DATA!!!!!", data)
            new_member = Member(
                name=data['name'],
                notes=data['notes'],
                created_at=datetime.now()
            )
            print("MEMBER NAME!!!!!!!!!!!", new_member.name, new_member.notes)
            db.session.add(new_member)
            db.session.commit()
            return redirect("/members")
        else:
            print("NO!!")

    # members = Member.query.all()
    # ppl = {}
    # idx = 0
    # for member in members:
    #     ppl[idx] = {
    #         "id": members[idx].id,
    #         "name": members[idx].name,
    #         "notes": members[idx].notes,
    #         "created_at": members[idx].created_at,
    #     }
    #     idx+=1
    
    # return ppl


# @members_routes.route('/create/new', methods=["POST"])
# def posting_member():
#     print("REQUEST!!!!!!!!!", request)
#     # form = MemberCreateForm()
#     # if request.method == "POST":
#     #     print("ATTEMPTING TO POST!!!!!!!!!!!!!")
#     #     if form.validate_on_submit:
#     #         print("DATA!!!!!!!!!!", form.data)
#     #     else:
#     #         print("NO!!")
#     return "Gello"