App.Chapter = RL.Model.extend({
  id: RL.attr('string'),
  resourceProvider: RL.attr('string'),
  subject: RL.attr('string'),
  grade: RL.attr('string'),
  chapterOrder: RL.attr('number'),
  chapterTitle: RL.attr('string'),
  lessons: RL.hasMany('App.Lesson')
});

App.Lesson = RL.Model.extend({
  id: RL.attr('string'),
  lessonOrder: RL.attr('number'),
  lessonTitle: RL.attr('string'),
  course: RL.belongsTo('App.Chapter'),
  resources: RL.hasMany('App.Resource')
});

//TODO: add objectiveData, ltiData
App.Resource = RL.Model.extend({
  id: RL.attr('string'),
  resourceOrder: RL.attr('number'),
  resourceTitle: RL.attr('string'),
  resourceDescription: RL.attr('string'),
  compassLearningResourceCode: RL.attr('string'),
  compassLearningResourceType: RL.attr('string'),
  resourceType: RL.attr('string'),
  ltiDataEndPoint: RL.attr('string'),
  thumbNailUrl: RL.attr('string'),
  course: RL.belongsTo('App.Lesson')
});
