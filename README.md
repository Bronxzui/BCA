# BCA
import tkinter as tk
import requests

def fetch_quote():
    response = requests.get("https://api.quotable.io/random")
    if response.status_code == 200:
        quote_data = response.json()
        return f"{quote_data['content']} — {quote_data['author']}"
    else:
        return "Could not fetch a quote."

def show_quote():
    quote = fetch_quote()
    quote_label.config(text=quote)

# Create the main window
root = tk.Tk()
root.title("Daily Quote Generator")

# Create a label to display the quote
quote_label = tk.Label(root, text="", wraplength=400, justify="center")
quote_label.pack(pady=20)

# Create a button to fetch a new quote
fetch_button = tk.Button(root, text="Get a New Quote", command=show_quote)
fetch_button.pack(pady=10)

# Start the GUI loop
root.mainloop()
