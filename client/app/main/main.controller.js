'use strict';
angular.module('techkidsApp')
  .controller('MainController', function($scope, $http, $state){
    $scope.submitCourse = function () {
      var data = {
        "course_title" : "Khoá học múa cột",
        "type" : "muacot",
        "description" : "<p>Lý do nên chọn Múa cột từ chia sẻ của Mr Cảnh (PM Fsoft)</p><p>- Thích, giỏi ngôn ngữ nào hơn: Java hay objective C. Nếu Java thì chọn Android. Chi phí ban đầu cho Android ~ 0$, iOS ~ 100$ <br>- Nhu cầu tuyển dụng: iOS 1 phần, Android 2-3 phần. Khách hàng doanh nghiệp đang chịu chi cho Android hơn iOS <br>- Dev iOS không có điều kiện để làm dự án siêu to, siêu khủng. Team size thường dừng lại ở mức 3-15 người. 1 Team Android thì có thể size từ 3-300 người</p><p>Chẳng cái nào trong iOS hay Android hứa hẹn đem lại cho các bạn thu nhập hay công việc cả đời cả. Vì thế: cái quan trọng là khả năng tư duy của các bạn, ngôn ngữ lập trình đơn giản chỉ là cái thể hiện suy nghĩ của các bạn lên màn hình thôi. Và ở thằng học & đang đọc dòng này thích gì và có dám sống hết mình với đam mê không? <br></p>",
        "next_class" : {
            "opening_time" : "25/06/2016",
            "date" : "Tối thứ 3 (19h30-21h30) chiều thứ 7,Chủ nhật (16h30-18h30)",
            "overall_time" : "4 tháng + 1 tháng thực tập. 3 buổi học chính/tuần",
            "scholarship" : "<span>20-50%</span></p><p>Học phí bao gồm tất cả quà tặng (sổ, áo TechKids...)</p>"
        },
        "content" : {
            "info" : "<div><p><strong>Chúng tôi không chỉ dạy về lập trình</strong></p><p><strong>Chúng tôi mong muốn tạo ra thế hệ Lập trình viên xuất sắc!</strong></p>",
            "purpose" : "<p><span>Có đủ kỹ năng cần thiết để làm việc ở các công ty IT/dự án toàn cầu.</span></p><p><span>Tự làm sản phẩm bán trên Appstore/Google play, khởi nghiệp vừa và nhỏ</span></p>",
            "offer" : "dạy các bạn múa cột rất chuyên nghiệp",
            "basic_info" : "múa cột do cô giáo ngân dạy",
            "become_tk" : "vấu to mong nẩy là được nhận vào :D"
        },
        "instructors" : ["Ngan Nguyen"]
    }
      $http.post('/api/techkids/post-course', data).then(function (response){
        console.log('post course');
        $state.go("main");
      })
    };

    $scope.onDeleteCourse = function(){
        var data = {"_id" : "576ce5faa51fa9fc213e5db1"};
        $http.post("/api/techkids/delete-course",data).then(function(response){
            console.log("delete course");
        })
    };

    $scope.onEditCourse = function(){
        var data = {"_id" : "576cdec7272272a0045ec44f",
        "course_title" : "Khoá học múa cột 2",
        "type" : "muacot",
        "description" : "vào múa cột để tay khỏe hơn",
        "next_class" : {
            "opening_time" : "25/06/2016",
            "date" : "Tối thứ 3 (19h30-21h30) chiều thứ 7,Chủ nhật (16h30-18h30)",
            "overall_time" : "4 tháng + 1 tháng thực tập. 3 buổi học chính/tuần",
            "scholarship" : "vú to là được miễn phí"
        },
        "content" : {
            "info" : "<div><p><strong>Chúng tôi không chỉ dạy về lập trình</strong></p><p><strong>Chúng tôi mong muốn tạo ra thế hệ Lập trình viên xuất sắc!</strong></p>",
            "purpose" : "<p><span>Có đủ kỹ năng cần thiết để làm việc ở các công ty IT/dự án toàn cầu.</span></p><p><span>Tự làm sản phẩm bán trên Appstore/Google play, khởi nghiệp vừa và nhỏ</span></p>",
            "offer" : "dạy các bạn múa cột rất chuyên nghiệp",
            "basic_info" : "múa cột do cô giáo ngân dạy",
            "become_tk" : "vấu to mong nẩy là được nhận vào :D"
        },
        "instructors" : ["Ngan Nguyen"]
    };
        $http.post("/api/techkids/edit-course",data).then(function(response){
            console.log("edit course");
        })
    };
})
