
function getCurrentDate() {
    return new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '')
}

function post_save() {
    let title = $('#title').val();
    let password = $('#password').val();
    let content = editor.getMarkdown();
    console.log(title, password, content);
    $.ajax({
        type: 'PUT',
        url: '/api/post',
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
            title: title,
            content: content,
            date: getCurrentDate()
        },
        success: function (response) {
            alert('저장 완료!');
            location.href = '/';
        },
    });
}


async function post_edit(id) {
    let title = $('#title_edit').val();
    let content = editor.getMarkdown();

    $.ajax({
        type: 'PUT',
        url: `/api/post?id=${id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
            title: title,
            content: content,
        },
        success: function (response) {
            alert('수정 완료!');
            location.href = '/';
        },
    });
}

function post_delete(id) {
    $.ajax({
        type: 'DELETE',
        url: `/api/post?id=${id}`,
        data: {
        },
        success: function (response) {
            alert('삭제 완료!');
            location.href = '/';
        },
    });
}


// function check_password(id, password) {
//     let answer;
//     $.ajax({
//         type: 'GET',
//         url: `/api/post/password?id=${id}`,
//         async: false,
//         data: {
//             password: password,
//         },
//         success: function (response) {
//             answer = response['success']
//         },
//     });
//     return answer;
// }

function getSelf(callback) {
    $.ajax({
        type: "GET",
        url: "/api/users/me",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        success: function (response) {
            callback(response.user);
        },
        error: function (xhr, status, error) {
            if (status == 401) {
                alert("로그인이 필요합니다.");
            } else {
                localStorage.clear();
                alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
            }
            window.location.href = "/";
        },
    });
}

function comment_save() {


}