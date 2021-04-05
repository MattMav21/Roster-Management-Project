from flask import Blueprint, request, redirect
from app.models import db, User, Member, Member_Property, Property, Roster_Member, Roster
from app.forms import MemberCreateForm, MemberEditForm, PropertyAddForm
from datetime import datetime
from sqlalchemy import and_

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

    props = [];

    members_properties = Member_Property.query.filter(Member_Property.member_id == id).all()
    print("THIS MEMBER'S PROPERTIES", members_properties)

    for prop in members_properties:
        props.append(prop.property_id)

    print("PROPS", props)

    valid_properties = Property.query.filter(Property.id.in_(props)).all()

    print("VALID PROPS", valid_properties)

    props_obj = {}

    p = 0
    for valid_prop in valid_properties:
        props_obj[p] = {
            "id": valid_properties[p].id,
            "name": valid_properties[p].name,
            "is_checked": valid_properties[p].is_checked,
        }
        p+=1

    print("PROPS OBJECT", props_obj)

    single_person = {
        "id": member.id,
        "name": member.name,
        "notes": member.notes,
        "created_at": member.created_at,
        "roster_in": send_this,
        "properties": props_obj,
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
    if request.method == "POST":
        print("ATTEMPTING TO POST!!")
        if form.validate_on_submit:
            data = form.data
            print("DATA!!!!!", data)
            property_list = []
            property_check = Property.query.all()

            idx = 0
            for prop in property_check:
                property_list.append(property_check[idx].name)
                idx+=1

            if data['value'] in property_list:
                print("IF STATEMENT TRIGGERED!!!!!!!!!!!!!!!!!!!!")
                existing_property = Property.query.filter(Property.name == data['value']).one()
                print("WHAT IS THIS????????????", existing_property)
                print("existing property id", existing_property.id, existing_property.name)
                new_property = existing_property
                
                # new_property = existing_property(
                #     name=existing_property.name,
                #     is_checked=data['isChecked'],
                # )
            else:
                print("ELSE STATEMENT TRIGGERED")
                new_property = Property(
                    name=data['value'],
                    is_checked=data['isChecked'],
                )
                db.session.add(new_property)
                db.session.commit()

            # new_property.id somehow is "None"
            print("PROP!!!!!!!!", new_property.id, new_property.name, new_property.is_checked)
            # print("PROP ASSOCIATION!!!!!", new_member_property.id, new_member_property.member_id, new_member_property.property_id)

            new_member_property = Member_Property(
                member_id=m_id,
                property_id=new_property.id
            )

            db.session.add(new_member_property)
            db.session.commit()

    return { "Message" : "Property Added Successfully!"}, 200


@members_routes.route('/changecheck/<int:mem_id>/<int:prop_id>', methods=["PUT"])
def changed_check(mem_id, prop_id):
    changed_property = Property.query.filter(Property.id == prop_id).one()
    changed_association = Member_Property.query.filter(and_(Member_Property.member_id == mem_id, Member_Property.property_id == prop_id)).one()
    print( "CHECK THIS OUT!!Q!!!!!!", changed_property.id, changed_association.id)
    request_object = request.get_json()
    print("REQUEST OBJ CHECK", request_object['isChecked'])
    changed_property.is_checked = request_object['isChecked']
    db.session.commit()
    # change is_checked
    print("CHANGED???????", changed_property.is_checked)

    return { "message" : "Property changed!"}

    # print("TEST", True)
    # print("TEST", 1 == 1)
    # print("TEST", False)
    # print("TEST", 1 == 2)


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

