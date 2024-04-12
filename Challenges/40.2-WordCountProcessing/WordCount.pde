IntDict counts;

void setup() {
  size(600, 600);
  fullScreen();
  background(0);
  counts = new IntDict();
  String[] lines = loadStrings("rainbow.txt");
  String allwords = join(lines, "\n");
  String[] tokens = splitTokens(allwords, " \n.,\";?()[]!");
  for(int i = 0; i < tokens.length; i++) {
    String word = tokens[i].toLowerCase();
    if(counts.hasKey(word)){
      counts.increment(word);
    } else{
      counts.set(word, 1);
    }
  }
  print(counts);
  String[] keys = counts.keyArray();
  for(String k : keys) {
    int count = counts.get(k);
    textSize(count+10);
    float x = random(width);
    float y = random(height);
    text(k, x, y);
  }
}

void draw() {
}
