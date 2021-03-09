from flask import Blueprint, request, redirect
from app.models import db, User, Member
from app.forms import MemberCreateForm, MemberEditForm
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
            return { "Message" : "Member Created Successfully!"}, 200

            # return redirect("/members")
        else:
            print("NO!!")


@members_routes.route('/edit/<int:id>', methods=["GET", "PUT"])
def edit_member(id):
    member_to_edit = Member.query.get_or_404(id)
    form = MemberEditForm()
    print("EDIT THIS MEMBER!!!!!!!!!!!!!", member_to_edit)
    if request.method == "PUT":
        print("PUT REQUEST")
        if form.validate_on_submit:
            data = form.data
            print("DATA!!!!!", data)
            member_to_edit.name=data['name'],
            member_to_edit.notes=data['notes'],
            # print("MEMBER NAME!!!!!!!!!!!", edited_member.name, edited_member.notes)
            # db.session.add(member_to_edit)
            print("EDITING THIS MEMBER", member_to_edit)
            db.session.commit()
            return { "Message" : "Member Edited Successfully!"}, 200
            # return redirect("/members")
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

