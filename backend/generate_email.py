import os
from dotenv import load_dotenv
from openai import ChatCompletion
from langchain import PromptTemplate, LLMChain
from langchain.chat_models import ChatOpenAI
from django.http import JsonResponse

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def generate_email(request):
    if request.method == "POST":
        department = request.POST.get("department", "")

        template = """
        Generate a professional phishing simulation email tailored to the {department} department. Ensure it looks authentic and includes a call-to-action.
        """

        prompt = PromptTemplate(input_variables=["department"], template=template)
        llm = ChatOpenAI(temperature=0.7, openai_api_key=OPENAI_API_KEY)
        chain = LLMChain(prompt=prompt, llm=llm)

        email_content = chain.run({"department": department})

        return JsonResponse({"email": email_content})
    return JsonResponse({"error": "Invalid request"}, status=400)
    