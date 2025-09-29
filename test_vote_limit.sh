# test_vote_limit.sh
#!/bin/bash
API_URL="http://localhost:3001/api/ideas"
TEST_IP="192.168.1.204"

echo "Тестирование лимита голосов с IP: $TEST_IP"

for i in {1..11}; do
  response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL/$i/vote" -H "X-Forwarded-For: $TEST_IP")
  echo "Голос $i: статус $response"

  if [ $response -eq 409 ]; then
    echo "* Лимит голосов сработал корректно на голосе №$i"
    break
  fi
done