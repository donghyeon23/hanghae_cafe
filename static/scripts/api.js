
function getCurrentDate() {
    return new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '')
}

function post_save() {
    let title = $('#title').val();
    let writer = $('#writer').val();
    let password = $('#password').val();
    let content = editor.getMarkdown();
    console.log(title, writer, password, content);
    $.ajax({
        type: 'PUT',
        url: '/api/post',
        data: {
            title: title,
            writer: writer,
            content: content,
            password: password,
            date: getCurrentDate()
        },
        success: function (response) {
            alert('저장 완료!');
            location.href = '/';
        },
    });
}


async function post_edit(id) {
    let password = $('#password').val();
    console.log(check_password(id, password))
    if (await check_password(id, password)) {
        let title = $('#title_edit').val();
        let writer = $('#writer_edit').val();
        let content = editor.getMarkdown();

        $.ajax({
            type: 'PUT',
            url: `/api/post?id=${id}`,
            data: {
                title: title,
                writer: writer,
                content: content,
                password: password,
                date: getCurrentDate()
            },
            success: function (response) {
                alert('수정 완료!');
                location.href = '/';
            },
        });
    } else {
        alert('비밀번호를 다시 확인해 주세요!');

    }
}

async function post_delete(id) {
    let password = $('#password').val();
    console.log(check_password(id, password));
    if (await check_password(id, password)) {
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
    } else {
        alert('비밀번호를 다시 확인해 주세요!');

    }
}


function check_password(id, password) {
    let answer;
    $.ajax({
        type: 'GET',
        url: `/api/post/password?id=${id}`,
        async: false,
        data: {
            password: password,
        },
        success: function (response) {
            answer = response['success']
        },
    });
    return answer;
}