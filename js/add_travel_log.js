jQuery(document).ready(function(){
  $('#edit-field-buddies-0-value-wrapper').hide();
  if ($('#fb-root') !== []) {
    $('body').prepend('<div id="fb-root"></div> ');
  }

  (function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js#xfbml=1';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
  }());

  window.fbAsyncInit = function() {
    FB.Canvas.setSize({height: 1600}); // Live in the past
    var fb_startup_kit = Drupal.settings.fb_startup_kit;
    var buddy_str = fb_startup_kit && fb_startup_kit.buddies_str;
    var buddies_list = buddy_str && buddy_str.split(", ") || [],
        i = 0;
    var api_key = fb_startup_kit && Object.prototype.toString.apply(fb_startup_kit.apikey) === "[object Array]" ? fb_startup_kit.apikey[0]: fb_startup_kit.apikey;
    FB.init({
      appId  : api_key || '246345852043389',
      status : true, // check login status
      cookie : true, // enable cookies to allow the server to access the session
      xfbml  : true,  // parse XFBML
      channel: 'http://www.gonorththailand.com/sites/all/static/page/fb_channel.php'
    });

    // Empty buddies list is node_form.
    if (buddies_list.length === 0) {
      init();
      //login();
    }
    // Have buddies list is from views.
    else {
      for (i=0; i<buddies_list.length; i++) {
        FB.api('/'+buddies_list[i], function(res) {
            try {
              $('#' + res.id).attr({'alt': res.name, 'title': res.name});
            }
            catch(err) {
              alert(arr);
            }
        })
      }
    }
    FB.Canvas.setAutoResize(90);
    FB.Canvas.scrollTo(0,0);
  }
});

function login() {
    FB.login(function(response) {
        if (response.session) {
            init();

        } else {
            alert('Login Failed!');
        }
    });
}

function init() {
  FB.api('/me', function(response) {
    //$("#username").html("<img src='https://graph.facebook.com/" + response.id + "/picture'/><div>" + response.name + "</div>");
    $("#jfmfs-container").jfmfs({
      max_selected_message: "{0} of {1} selected",
      friend_fields: "id,name,last_name",
      pre_selected_friends: $("#edit-field-buddies-0-value").val().split(", ") || [],
      //exclude_friends: [1211122344, 610526078],
      sorter: function(a, b) {
        var x = a.last_name.toLowerCase();
        var y = b.last_name.toLowerCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
    });

    $("#jfmfs-container").bind("jfmfs.friendload.finished", function() {

    });

    $("#jfmfs-container").bind("jfmfs.selection.changed", function(e, data) {
        var friendSelected = $("#jfmfs-container").data('jfmfs');
        var friend_ids_as_text = friendSelected.getSelectedIds().join(', ');
        $("#edit-field-buddies-0-value").val(friend_ids_as_text);
    });

    $("#logged-out-status").hide();
    $("#show-friends").show();

  });
}

$("#show-friends").live("click", function() {
    var friendSelector = $("#jfmfs-container").data('jfmfs');
    $("#selected-friends").html(friendSelector.getSelectedIds().join(', '));
});


