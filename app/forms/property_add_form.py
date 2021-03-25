from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField, BooleanField
from wtforms.validators import DataRequired

class PropertyAddForm(FlaskForm):
    value = StringField("Name", validators=[DataRequired()])
    isChecked = BooleanField("Is Checked", validators=[DataRequired()])