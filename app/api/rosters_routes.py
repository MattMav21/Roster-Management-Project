from flask import Blueprint, request, redirect, session
from app.models import db, User, Roster, Roster_Member, Member, Property, Member_Property
from app.forms import RosterCreateForm, RosterAssignmentForm, RosterEditForm
from sqlalchemy import and_, join
from sqlalchemy.sql import select
# from sqlalchemy.orm import sessionmaker
# Session = sessionmaker(bind = engine)
# session = Session()

rosters_routes = Blueprint('rosters', __name__)

@rosters_routes.route('/', methods=["GET"])
def everybody():
    rosters = Roster.query.order_by(Roster.name).all()
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
    roster = Roster.query.get_or_404(id)
    roster_members = Roster_Member.query.filter(Roster_Member.roster_id == id).all()
    # print("ROSTER MEMBERS!!!!!!!!!!!!!!!!!!!!!", roster_members)
    # this is good!
    correct_members_ids = []
    # [2, 4] if id is 2, [1, 3, 5] if id is 1
    idx = 0
    for member in roster_members:
        correct_members_ids.append(int(member.member_id))
        idx+=1
    # print("CORR MEMBER IDS", correct_members_ids)
    correct_members = Member.query.filter(Member.id.in_(correct_members_ids)).order_by(Member.name).all()
    # print("CORR MEMBERS", correct_members)
    correct_object = {}
    count = 0
    for correct in correct_members:
        # print("CORRECT MEMBER", correct.name)
        correct_object[count] = {
            "id": correct.id,
            "name": correct.name,
            "notes": correct.notes,
            "created_at": correct.created_at
        }
        count+=1

    # print("OMG!!!!!!!!!!!!!!!", correct_object)
    single_roster = {
        "id": roster.id,
        "name": roster.name,
        "notes": roster.notes,
        "user_id": roster.user_id,
        "this_roster": correct_object
    }
    # print("CORRECT OBJECT")

    return single_roster


@rosters_routes.route('/create', methods=["GET", "POST"])
def form_for_new_rosters():
    current_user = int(session['_user_id'])
    print("REQUEST!", request.data)
    form = RosterCreateForm()
    if request.method == "POST":
        print("ATTEMPTING TO POST!!")
        if form.validate_on_submit:
            data = form.data
            print("DATA!!!!!", data)
            new_roster = Roster(
                name=data['name'],
                notes=data['notes'],
                user_id=current_user
            )
            print("ROSTER NAME!!!!!!!!!!!", new_roster.name, new_roster.notes)
            db.session.add(new_roster)
            db.session.commit()
            return { "Message" : "Roster Created Successfully!"}, 200

            # NEVER use redirect if you're only using the route for API Fetch
            # return redirect("/rosters")
        else:
            print("NO!!")


@rosters_routes.route('/assign', methods=["GET", "POST"])
def assignment(): 
    # print("ASSIGNMENT ATTEMPT!!!!!!!!!!")   

    form = RosterAssignmentForm()
    if request.method == "POST":
        # print("ATTEMPTING TO POST!!")
        if form.validate_on_submit:
            data = form.data
            print("DATA!!!!!", data)
            new_assignment = Roster_Member(
                roster_id=data['roster_id'],
                member_id=data['member_id']
            )
            # print("ROSTER NAME!!!!!!!!!!!", new_roster.name, new_roster.notes)
            print("NEW ASSIGNMENT!!!!!!!!!!!!!!!!!", new_assignment)
            db.session.add(new_assignment)
            db.session.commit()

            return { "Message" : "Assignment Successful!"}, 200
            # return redirect("/rosters")
        else:
            print("NO!!")
    
    return each_roster


@rosters_routes.route('/edit/<int:id>', methods=["GET", "PUT"])
def edit_roster(id):
    roster_to_edit = Roster.query.get_or_404(id)
    # HERE
    form = RosterEditForm()
    print("EDIT THIS ROSTER!!!!!!!!!!!!!", roster_to_edit)
    if request.method == "PUT":
        print("PUT REQUEST")
        if form.validate_on_submit:
            data = form.data
            print("UPDATED ROSTER DATA!!!!!", data)
            roster_to_edit.name=data['name'],
            roster_to_edit.notes=data['notes'],
            # print("MEMBER NAME!!!!!!!!!!!", edited_member.name, edited_member.notes)
            # db.session.add(member_to_edit)
            print("EDITING THIS ROSTER", roster_to_edit)
            db.session.commit()
            return { "Message" : "Roster Edited Successfully!"}, 200
            # return redirect("/members")
        else:
            print("NO!!")


@rosters_routes.route('/delete/<int:r_id>', methods=["DELETE"])
def unassign(r_id):
    roster_to_destroy = Roster.query.get_or_404(r_id)
    # member_to_unassign = Member.query.filter()
    unassigned_members = Roster_Member.query.filter(Roster_Member.roster_id == roster_to_destroy.id).all()
    # print("THESE WILL BE UNASSIGNED!!!!!!!", unassigned_members)

    for gone in unassigned_members:
        db.session.delete(gone)
    db.session.delete(roster_to_destroy)
    db.session.commit()
    return { "Deletion" : "successful" }


@rosters_routes.route('<int:r_id>/delete/<int:m_id>', methods=["DELETE"])
def delete_roster(r_id, m_id):
    deleted_roster_members = Roster_Member.query.filter(and_(Roster_Member.roster_id == r_id, Roster_Member.member_id == m_id)).all()
    for rm_roster_member in deleted_roster_members:
        db.session.delete(rm_roster_member)
    db.session.commit()
    return { "Deletion" : "successful" }


@rosters_routes.route('search/<query>', methods=["GET"])
def search_for(query):
    valid_members = {}
    member_ids = []
    matching_members = Member.query.filter(Member.name.ilike('%{}%'.format(query))).all()

    idx = 0
    for match_memb in matching_members:
        valid_members[idx] = {
            "id": matching_members[idx].id,
            "name": matching_members[idx].name,
            "notes": matching_members[idx].notes,
            "created_at": matching_members[idx].created_at,
        }
        member_ids.append(matching_members[idx].id)
        idx+=1

    # print("VALID", valid_members)
    # print("MEMBER IDS", member_ids)

    valid_rosters = {}
    matching_rosters = Roster.query.filter(Roster.name.ilike('%{}%'.format(query))).all()

    idx2 = 0
    for match_rost in matching_rosters:
        valid_rosters[idx2] = {
            "id": matching_rosters[idx2].id,
            "name": matching_rosters[idx2].name,
            "notes": matching_rosters[idx2].notes,
            "user_id": matching_rosters[idx2].user_id,
        }
        idx2+=1

    # print("VALID", valid_rosters)

    valid_properties = {}
    matching_properties = Property.query.filter(Property.name.ilike('%{}%'.format(query))).order_by(Property.name).all()

    idx3 = 0
    for match_props in matching_properties:
        valid_properties[idx3] = {
            "id": matching_properties[idx3].id,
            "name": matching_properties[idx3].name,
            "is_checked": matching_properties[idx3].is_checked,
        }
        idx3+=1

    print("VALID PROPERTIES", valid_properties)

    good_true_query = db.session.query(Member.id, Member.name, Property.id, Property.name).\
        filter(Member_Property.member_id == Member.id).\
            filter(Member_Property.property_id == Property.id).\
                filter(Property.is_checked == True).all()

    good_false_query = db.session.query(Member.id, Member.name, Property.id, Property.name).\
        filter(Member_Property.member_id == Member.id).\
            filter(Member_Property.property_id == Property.id).\
                filter(Property.is_checked == False).all()


    print("good true", good_true_query)
    print("good false", good_false_query)

    true_obj = {}
    false_obj = {}

    matching_dict = {
        "matching_members": valid_members,
        "matching_rosters": valid_rosters,
        "matching_properties": valid_properties,
        "true_data": good_true_query,
        "false_data": good_false_query,
    }

    return matching_dict