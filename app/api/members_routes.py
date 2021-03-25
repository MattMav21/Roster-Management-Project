from flask import Blueprint, request, redirect
from app.models import db, User, Member, Member_Property, Roster_Member, Roster
from app.forms import MemberCreateForm, MemberEditForm, PropertyAddForm
from datetime import datetime

members_routes = Blueprint('members', __name__)

@members_routes.route('/', methods=["GET"])
def everybody():
    members = Member.query.order_by(Member.name).all()
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
    
    correct_roster_ids = []

    member_of = Roster_Member.query.filter(Roster_Member.member_id == id).all()
    print("MEMBER OF!!!!!!!!!!!!!!!", member_of)

    for ros_mem in member_of:
        correct_roster_ids.append(ros_mem.roster_id)
    # rosters_on = Roster.query.filter

    correct_rosters = Roster.query.filter(Roster.id.in_(correct_roster_ids)).all()

    print("CORR ROST", correct_rosters)

    send_this = {}

    k = 0;
    for roster in correct_rosters:
        send_this[k] = {
            "id": correct_rosters[k].id,
            "name": correct_rosters[k].name,
        }
        k+=1

    print("SEND!!!!", send_this)

    single_person = {
        "id": member.id,
        "name": member.name,
        "notes": member.notes,
        "created_at": member.created_at,
        "roster_in": send_this,
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


@members_routes.route('/delete/<int:m_id>', methods=["DELETE"])
def unassign(m_id):
    member_to_destroy = Member.query.get_or_404(m_id)
    # member_to_unassign = Member.query.filter()
    unassigned_properties = Member_Property.query.filter(Member_Property.member_id == member_to_destroy.id).all()
    unassigned_members = Roster_Member.query.filter(Roster_Member.member_id == member_to_destroy.id).all()
    # print("THESE WILL BE UNASSIGNED!!!!!!!", unassigned_members)

    for gone in unassigned_members:
        db.session.delete(gone)

    for seeya in unassigned_properties:
        db.session.delete(seeya)

    db.session.delete(member_to_destroy)
    db.session.commit()
    return { "Deletion" : "successful" }


@members_routes.route('/unassigned', methods=["GET"])
def unassigned():
    roster_members = Roster_Member.query.all()

    unassigned_members_ids = []

    idx = 0
    for m in roster_members:
        unassigned_members_ids.append(m.member_id)
        idx+=1

    no_home = Member.query.filter(Member.id.notin_(unassigned_members_ids)).all()

    print("NO HOME!!!!!!!!", no_home)

    # members = Member.query.all()
    unassigned_ppl = {}
    i = 0
    for homeless in no_home:
        unassigned_ppl[i] = {
            "id": no_home[i].id,
            "name": no_home[i].name,
            "notes": no_home[i].notes,
            "created_at": no_home[i].created_at,
        }
        i+=1

    print("UNASSIGNED!!!!!!!!", unassigned_ppl)
    
    return unassigned_ppl


@members_routes.route('/addProp/<int:m_id>', methods=["GET", "POST"])
def add_property(m_id):
    print("REQUEST!", request.data)
    form = PropertyAddForm()
    print("MEMBER ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", m_id)
    # print("TEST", True)
    # print("TEST", 1 == 1)
    # print("TEST", False)
    # print("TEST", 1 == 2)
    
    return { "Message" : "Property Added Successfully!"}, 200


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

