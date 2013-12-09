App.Course = RL.Model.extend({
  id: RL.attr('id'),
  subject: RL.attr('string'),
  accountId: RL.attr('string'),
  code: RL.attr('string'),
  title: RL.attr('string'),
  description: RL.attr('string'),
  syllabus: RL.attr('string'),
  externalId: RL.attr('string'),
  status: RL.attr('string', { defaultValue: 'draft' }),
  courseItems: RL.hasMany('App.CourseItem')
});

App.CourseItem = RL.Model.extend({
  id: RL.attr('id'),
  localRefId: RL.attr('string'),
  type: RL.attr('string'),
  title: RL.attr('string'),
  groupName: RL.attr('string'),
  // resourceId: RL.attr('ObjectId'),
  // attributes: RL.attr('Object'),
  course: RL.belongsTo('App.Course')
});