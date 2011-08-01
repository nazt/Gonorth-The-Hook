$(document).ready(function(){
  $('.reference-autocomplete').live('click', function(e) {
    insert_comment_link($(this).closest('#autocomplete').siblings('input'));
  });

  $('input[name^=field_day_plan]').live('keypress', function(e) {
    var that = $(this);
    if (e.keyCode == 13) {
      setTimeout(function() { insert_comment_link(that) }, 100);
    }
  });

  $('.add-fb-comment').live('click', function(e) {
    e.preventDefault();
    window.open($(this).attr('href'), "Comment", "width=510,height=300,status=yes,toolbar=no,menubar=no,location=no");
  });

  insert_comment_link_rebuild();
});

var insert_comment_link = function(element) {
  var value = element.val();
  var matches = value.match(/\[nid:(\d*)\]/);
  if (matches !== null) {
    var nid = matches[1];
    var link = Drupal.settings.basePath + 'facebook/profile/place/' + nid + '/comments';
    $('.add-fb-comment', element.parent()).remove();
    $(element).after('<a class="add-fb-comment" href="'+ link +'">เพิ่มความคิดเห็น</a>');
  }
}

var insert_comment_link_rebuild = function() {
  $('.add-fb-comment').remove();

  $('input[name^=field_day_plan]').each(function(i, element) {
    insert_comment_link($(element));
  });
}
