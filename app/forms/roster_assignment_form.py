from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class RosterAssignmentForm(FlaskForm):
    roster_id = IntegerField("Roster ID", validators=[DataRequired()])
    member_id = IntegerField("Member ID", validators=[DataRequired()])