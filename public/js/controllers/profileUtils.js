getLastDigit = (t) => {
 return parseInt(t.toString().slice(-1))
}

getFirstDigits = (t) => {
 return parseInt(t.toString().slice(0,-1))
}

isMultipleOf5 = (t) => {
 return [0,5].reduce((res,curr)=>{
   return res = res || curr === getLastDigit(t);
 },false);
}

isBetween0and5 = (t) => {
  const _t = getLastDigit(t);
  return  _t < 5;
}

isBetween5and9 = (t) => {
  const _t = getLastDigit(t);
  return  _t => 5 && _t <= 9;
}

appendDigit = (t,d) => {
  return parseInt(getFirstDigits(t).toString() + d.toString())
}

getLeft = (t) => {
  if(t>=10){
    if(isBetween0and5(t)) return appendDigit(t,0);
    else return appendDigit(t,5);
  } else {
    if (t<5) return 0;
    else return 5;
  }
}

getSecondRightMostDigit = (t) => {
  return parseInt(t.toString().slice(-2,-1))
}

incrementSecondDigit = (t) => {
  return t+10;
}

getRight = (t) => {
  if(t<5) return 5;
  else if (t<10) return 10;
  else if(isBetween0and5(t)) return appendDigit(t,5)
  else return appendDigit(incrementSecondDigit(t),0);
}

function range(c,m) {
  var current = c || 1,
      last = m,
      delta = 2,
      left = getLeft(c),
      right = getRight(c),
      range = [],
      rangeWithEllipsis = [],
      l,
      t;

      var rightBoundary = right < 5 ? 5 : right;
      for (var i = left ; i < rightBoundary ; ++i) {
        if( i < m && i > 0) range.push(i);
      }  
      range.push(m);

      for (var i of range) {
        if (l) {
          if (i - l === 2) {
            t = l+1;
            rangeWithEllipsis.push(t);
          } else if (i - l !== 1){
            rangeWithEllipsis.push("...");
          }
        }
        rangeWithEllipsis.push(i);
        l = i;
      }
    return rangeWithEllipsis;
}


//한 Pagination당 3개를 보여준다.
var opts = {
    pageMax: 3,
}


//loadPost.
function loadPosts(posts, postsDiv, postsTemplate, contextFn, dynamicClass) {
    postsDiv.empty();
    posts.each(function () {
        var template = postsTemplate;
        var context = contextFn(this);
        var html = template(context);
        postsDiv.append(html);
    });
    hidePrev(dynamicClass);
}

function hidePrev(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-prev').hide(); }
function showPrev(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-prev').show(); }

function hideNext(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-next').hide(); }
function showNext(dynamicClass) { $('.pagination '+dynamicClass+' .pagination-next').show(); }

//pagination관련 함수, Template EPpagination을 만들어주는 함수이기도 하다.
function paginate(data, page, pageCount, postsDiv, postsTemplate, postsContext, dynamicClass, gotoPageNumber) {
    var template = TPL.EPpagination;
    var context = { pages: range(page,pageCount), dynamicClass: dynamicClass};
    var html = template(context);
    var paginationTag = postsDiv.parent().find("."+dynamicClass);
    paginationTag.length > 0 ? paginationTag.replaceWith(html) : postsDiv.after(html);

    function changePage(page) {
        pageItems.removeClass('active');
        pageItems.filter('[d-page="' + page + '"]').addClass('active');
        loadPosts(data.slice(page * opts.pageMax - opts.pageMax, page * opts.pageMax), postsDiv, postsTemplate, postsContext, dynamicClass);
        paginate(data, page, pageCount, postsDiv, postsTemplate, postsContext, dynamicClass);
        if (gotoPageNumber <= 1) {
            hidePrev(dynamicClass);
        }
    }

    var pageItems = $('.'+dynamicClass+'>li.pagination-page');
    var pageItemsLastPage = $('.'+dynamicClass+' li').length - 2;
    pageItems.removeClass('active');
    pageItems.filter('[d-page="' + page + '"]').addClass('active');

    pageItems.on('click', function (evt) {
        getDataPageNo = this.getAttribute('d-page')
        if(getDataPageNo === "..."){
            getDataPageNo = parseInt($('.'+dynamicClass+'>li.active').attr('d-page')) + 1;
        }
        changePage(getDataPageNo);
        if (getDataPageNo == 1) {
            hidePrev(dynamicClass)
        }
        else if (getDataPageNo == pageItemsLastPage) {
            hideNext(dynamicClass);
        }
        else {
    /*showPrev(dynamicClass);
            showNext(dynamicClass);*/
        }
    });

    $('.'+dynamicClass+'>li.pagination-prev').on('click', function () {
        gotoPageNumber = parseInt($('.'+dynamicClass+'>li.active').attr('d-page')) - 1;
        changePage(gotoPageNumber);
    });

    $('.'+dynamicClass+'>li.pagination-next').on('click', function () {
        gotoPageNumber = parseInt($('.'+dynamicClass+'>li.active').attr('d-page')) + 1;
        if (gotoPageNumber > pageCount) {
            gotoPageNumber = 1;
            showPrev(dynamicClass);
        }
        changePage(gotoPageNumber);
    });
}

//실제로 pagination과 post를 엮어서, 하나의 페이지네이션이 완련된 포스팅을 만들어주는 함수.
//데이터와 객체를 받는다.
var makePosts = function(data, dataObj){
  var dataCount = data.length;

    storyPageCount = Math.ceil(dataCount / opts.pageMax);

    if (dataCount > opts.pageMax) {
        paginate(data, 1, storyPageCount, dataObj.postsDiv, dataObj.template, dataObj.contextFn, dataObj.dynamicClass, dataObj.gotoPageNumber);
        posts = data.slice(0, opts.pageMax);
    } else {
        posts = data;
    }
    loadPosts(posts, dataObj.postsDiv, dataObj.template, dataObj.contextFn, dataObj.dynamicClass);
}