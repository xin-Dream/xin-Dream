$(document).ready(function () {
    clickTreeDirectory();
});

// 点击目录事件
function clickTreeDirectory() {
    // 判断有 active 的话，就递归循环把它的父目录打开
    var treeActive = $("#tree .active");
    if ( treeActive.length ) {
        showActiveTree(treeActive, true);
    }

    // 点击目录，就触发折叠动画效果
    $(document).on("click", "#tree a[class='directory']", function (e) {
        // 用来清空所有绑定的其他事件
        event.preventDefault();

        var icon = $(this).children(".fa");
        var iconIsOpen = icon.hasClass("fa-folder-open");
        var subTree = $(this).siblings("ul");

        icon.removeClass("fa-folder-open").removeClass("fa-folder");

        if (iconIsOpen) {
            if (typeof subTree != "undefined") {
                subTree.slideUp({ duration: 100 });
            }
            icon.addClass("fa-folder");
        } else {
            if (typeof subTree != "undefined") {
                subTree.slideDown({ duration: 100 });
            }
            icon.addClass("fa-folder-open");
        }
    });
}

// 循环递归展开父节点
function showActiveTree(jqNode, isSiblings) {
    if ( jqNode.attr("id") === "tree"  ) { return; }
    if ( jqNode.is("ul") ) {
        jqNode.css("display", "block");

        // 这个 isSiblings 是给搜索用的
        // true 就显示开同级兄弟节点
        // false 就是给搜索用的，值需要展示它自己就好了，不展示兄弟节点
        if ( isSiblings ) { 
            jqNode.siblings().css("display", "block");
            jqNode.siblings("a").css("display", "inline");
            jqNode.siblings("a").find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
        }
    }
    jqNode.each(function(){ showActiveTree($(this).parent(), isSiblings); });
}

// 搜索框输入事件
function serachTree() {
    // 解决搜索大小写问题
    jQuery.expr[':'].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $("#search input").on("input", function(e){
        e.preventDefault();

        // 获取 inpiut 输入框的内容
        var inputContent = e.currentTarget.value;

        // 没值就收起父目录，但是得把 active 的父目录都展开
        if ( inputContent.length === 0 ) {
            $(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
            $("#tree ul").css("display", "none");
            if ( $("#tree .active").length ) {
                showActiveTree($("#tree .active"), true);
            }
            else {
                $("#tree").children().css("display", "block");
            }
        }
        // 有值就搜索，并且展开父目录
        else {
            $(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
            $("#tree ul").css("display", "none");
            var searchResult = $("#tree li").find("a:contains('" + inputContent + "')");
            if ( searchResult.length ) { 
                showActiveTree(searchResult.parent(), false) 
            }
        }
    });
}
