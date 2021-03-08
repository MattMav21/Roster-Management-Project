from flask import Blueprint, request, redirect, session
from app.models import db, User, Roster, Roster_Member, Member
from app.forms import RosterCreateForm, RosterAssignmentForm

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
    roster = Roster.query.get_or_404(id)

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
        print("CORRECT MEMBER", correct.name)
        correct_object[count] = {
            "id": correct.id,
            "name": correct.name,
            "notes": correct.notes,
            "created_at": correct.created_at
        }
        count+=1

    print("OMG!!!!!!!!!!!!!!!", correct_object)

    single_roster = {
        "id": roster.id,
        "name": roster.name,
        "notes": roster.notes,
        "user_id": roster.user_id,
        "this_roster": correct_object
    }

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
