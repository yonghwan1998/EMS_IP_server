'use strict';

const id = document.querySelector('#id');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const tel = document.querySelector('#tel');
const elderTel = document.querySelector('#elderTel');
const address = document.querySelector('#address');
const detailedAddress = document.querySelector('#detailedAddress');

const Btn = document.querySelector('#Btn');
Btn.addEventListener('click', sample6_execDaumPostcode);

function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("sample6_extraAddress").value = extraAddr;

      } else {
        document.getElementById("sample6_extraAddress").value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    }
  }).open();
}


const signUpBtn = document.querySelector('#signUpButton');

signUpBtn.addEventListener('click', signUp);

function signUp() {

  const homeAddress = `${address.value} ${detailedAddress.value}`;
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const regex = / /gi;

  const req = {
    id: id.value.replace(regex, ''),
    password: password.value.replace(regex, ''),
    passwordConfirm: passwordConfirm.value.replace(regex, ''),
    tel: tel.value.replace(regex, ''),
    elderTel: elderTel.value.replace(regex, ''),
    homeAddress: homeAddress,
  };

  if (req.id.length < 5 || req.id.length > 20) {
    alert('5~20자의 영문 소문자, 숫자를 이용한 아이디를 생성해 주세요.');
  } else if (req.id !== req.id.toLowerCase()) {
    alert('5~20자의 영문 소문자, 숫자를 이용한 아이디를 생성해 주세요.');
  } else if (special_pattern.test(req.id) === true) {
    alert('아이디에 특수문자가 입력되었습니다.');
  } else if (req.password.length < 8 || req.password.length > 16) {
    alert('8~16자 영문 대 소문자, 숫자, 특수문자를 이용한 비밀번호를 생성해 주세요.');
  } else if (req.password !== req.passwordConfirm) {
    alert('비밀번호를 다시 확인해 주세요.');
  } else {
    fetch('/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert(res.msg);
          location.href = '/login';
        } else {
          alert(res.msg);
        }
      })
      .catch((err) => {
        console.log(new Error('회원가입 중 에러 발생'));
      });
  }
}