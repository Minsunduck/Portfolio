# Figma MCP 설정 가이드

## 1. Figma 개인 액세스 토큰 발급 방법

1. **Figma 웹사이트 접속**: https://www.figma.com
2. **계정 설정으로 이동**: 우측 상단 프로필 아이콘 클릭 → Settings
3. **개인 액세스 토큰 생성**:
   - 왼쪽 메뉴에서 "Personal access tokens" 선택
   - "Generate new token" 버튼 클릭
   - 토큰 이름 입력 (예: "Cursor MCP")
   - 토큰 생성 후 복사하여 안전한 곳에 보관

## 2. Cursor 설정 파일 적용

1. **Cursor 설정 파일 위치 확인**:
   - Windows: `%APPDATA%\Cursor\User\settings.json`
   - 또는 Cursor에서 `Ctrl + Shift + P` → "Preferences: Open Settings (JSON)"

2. **설정 파일에 MCP 서버 추가**:
   ```json
   {
     "mcpServers": {
       "Figma MCP": {
         "command": "cmd",
         "args": ["/c", "npx", "-y", "figma-developer-mcp", "--figma-api-key=YOUR-ACTUAL-TOKEN", "--stdio"]
       }
     }
   }
   ```

3. **YOUR-ACTUAL-TOKEN을 실제 토큰으로 교체**

## 3. Figma Dev Mode 활성화

1. **Figma 데스크톱 앱에서 Dev Mode 활성화**
2. **MCP 서버 활성화**: Dev Mode에서 MCP 서버 옵션 활성화

## 4. 연결 테스트

1. **Cursor 재시작**
2. **Figma 디자인 파일 URL 사용**: 프롬프트에 Figma 파일 URL 포함하여 테스트

## 사용 예시

```
Figma 디자인 파일 URL: https://www.figma.com/file/your-file-id
이 디자인을 React 컴포넌트로 변환해주세요.
```
